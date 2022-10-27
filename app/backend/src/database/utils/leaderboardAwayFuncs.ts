import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

const getVictories = async () => {
  const arrayVictories = [] as any;
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allVictoriesAway = allMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals);
  allVictoriesAway.forEach((m) => {
    const id = m.awayTeam;
    const pos = arrayVictories.map((e: any) => e.id).indexOf(id);
    if (pos > -1) {
      arrayVictories[pos].results.victories += 1;
    } else {
      arrayVictories.push({
        id,
        results: { victories: 1, defeats: 0, draws: 0 },
        goals: { favor: 0, own: 0, balance: 0 },
      });
    }
  });

  return arrayVictories;
};

export const getDefeatsWVictories = async () => {
  const array = await getVictories();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allDefeatsAway = allMatches.filter((match) => match.awayTeamGoals < match.homeTeamGoals);

  allDefeatsAway.forEach((m) => {
    const id = m.awayTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.defeats += 1; }
  });

  return array;
};

export const getDrawsWVAndD = async () => {
  const array = await getDefeatsWVictories();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allDrawsAway = allMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);

  allDrawsAway.forEach((m) => {
    const id = m.awayTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.draws += 1; }
  });

  return array;
};

export const calculatePoints = async () => {
  const results = await getDrawsWVAndD();
  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const victories = r.results.victories * 3;
    const { draws } = r.results;
    results[pos].points = victories + draws;
  });

  return results;
};

export const calculateGames = async () => {
  const results = await calculatePoints();
  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const { victories, draws, defeats } = r.results;
    results[pos].games = victories + draws + defeats;
  });

  return results;
};

export const calculateEfficiency = async () => {
  const results = await calculateGames();
  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const { points, games } = r;
    const efficiency = (points / (games * 3)) * 100;
    results[pos].efficiency = efficiency.toFixed(2);
  });

  return results;
};

export const getAllAndGoalsAway = async () => {
  const results = await calculateEfficiency();
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
  console.log(results);

  return results;
};

export const getAllAndNameTeamAway = async () => {
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
  const {
    name, results, goals,
    points, games, efficiency,
  } = getAll;
  return {
    name,
    totalPoints: points,
    totalGames: games,
    totalVictories: results.victories,
    totalDraws: results.draws,
    totalLosses: results.defeats,
    goalsFavor: goals.favor,
    goalsOwn: goals.own,
    goalsBalance: goals.balance,
    efficiency,
  };
};
