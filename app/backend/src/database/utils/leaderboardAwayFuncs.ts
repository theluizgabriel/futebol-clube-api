import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

export const getTeams = async () => {
  const arrayTeams = [] as any;
  const allTeams = await Teams.findAll();
  allTeams.forEach((m) => {
    arrayTeams.push({
      id: m.id,
      name: m.teamName,
      results: { victories: 0, draws: 0, defeats: 0 },
      goals: { favor: 0, own: 0, balance: 0 },
      games: 0,
      points: 0,
      efficiency: 0,
    });
  });
  return arrayTeams;
};

const getVictoriesAway = async () => {
  const array = await getTeams();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allVictoriesAway = allMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals);

  allVictoriesAway.forEach((m) => {
    const id = m.awayTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.victories += 1; }
  });

  return array;
};

const getDefeatsWVictoriesAway = async () => {
  const array = await getVictoriesAway();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allDefeatsAway = allMatches.filter((match) => match.awayTeamGoals < match.homeTeamGoals);

  allDefeatsAway.forEach((m) => {
    const id = m.awayTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.defeats += 1; }
  });

  return array;
};

const getDrawsWVAndDAway = async () => {
  const array = await getDefeatsWVictoriesAway();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allDrawsAway = allMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);

  allDrawsAway.forEach((m) => {
    const id = m.awayTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.draws += 1; }
  });

  return array;
};

const calculatePointsAway = async () => {
  const results = await getDrawsWVAndDAway();
  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const victories = r.results.victories * 3;
    const { draws } = r.results;
    results[pos].points = victories + draws;
  });

  return results;
};

export const calculateEfficiencyAway = async () => {
  const results = await calculatePointsAway();
  results.forEach((t: any) => {
    const pos = results.map((e: any) => e.id).indexOf(t.id);
    const { victories, draws, defeats } = t.results;
    results[pos].games = victories + draws + defeats;
  });

  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const { points, games } = r;

    const efficiency = (points / (games * 3)) * 100;

    results[pos].efficiency = Number(efficiency.toFixed(2));
  });

  return results;
};

const getAllAndGoalsAway = async () => {
  const results = await calculateEfficiencyAway();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  allMatches.forEach((m) => {
    results.forEach((r: any) => {
      const pos = results.map((e: any) => e.id).indexOf(r.id);
      if (m.awayTeam === r.id) {
        results[pos].goals.favor += m.awayTeamGoals;
        results[pos].goals.own += m.homeTeamGoals;
        results[pos].goals.balance = results[pos].goals.favor - results[pos].goals.own;
      }
    });
  });

  return results;
};

const getAllAndNameTeamAway = async () => {
  const getAll = await getAllAndGoalsAway();
  const team = await Teams.findAll();
  getAll.forEach(async (t: any) => {
    const find = team.find((time) => time.id === t.id);
    const pos = getAll.map((e: any) => e.id).indexOf(t.id);
    getAll[pos].name = find?.teamName;
  });

  return getAll;
};

export const objectGetAllAway = async () => {
  const getAll = await getAllAndNameTeamAway();
  const map = getAll.map((team: any) => ({
    name: team.name,
    totalPoints: team.points,
    totalGames: team.games,
    totalVictories: team.results.victories,
    totalDraws: team.results.draws,
    totalLosses: team.results.defeats,
    goalsFavor: team.goals.favor,
    goalsOwn: team.goals.own,
    goalsBalance: team.goals.balance,
    efficiency: team.efficiency,
  }));
  return map;
};
