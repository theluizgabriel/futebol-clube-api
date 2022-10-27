import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

const getVictories = async () => {
  const arrayVictories = [] as any;
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allVictoriesHome = allMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  allVictoriesHome.forEach((m) => {
    const id = m.homeTeam;
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

const getDefeatsWVictories = async () => {
  const array = await getVictories();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allDefeatsHome = allMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

  allDefeatsHome.forEach((m) => {
    const id = m.homeTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.defeats += 1; }
  });

  return array;
};

const getDrawsWVAndD = async () => {
  const array = await getDefeatsWVictories();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allDrawsHome = allMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);

  allDrawsHome.forEach((m) => {
    const id = m.homeTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.draws += 1; }
  });

  return array;
};

const calculatePoints = async () => {
  const results = await getDrawsWVAndD();
  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const victories = r.results.victories * 3;
    const { draws } = r.results;
    results[pos].points = victories + draws;
  });

  return results;
};

const getGamesAndNames = async () => {
  const results = await calculatePoints();
  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const { victories, draws, defeats } = r.results;
    results[pos].games = victories + draws + defeats;
  });

  return results;
};

const calculateEfficiency = async () => {
  const results = await getGamesAndNames();
  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const { points, games } = r;
    const efficiency = (points / (games * 3)) * 100;
    results[pos].efficiency = Number(efficiency.toFixed(2));
  });

  return results;
};

export const getAllAndGoalsHome = async () => {
  const results = await calculateEfficiency();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  allMatches.forEach((m) => {
    results.forEach((r: any) => {
      const pos = results.map((e: any) => e.id).indexOf(r.id);
      if (m.homeTeam === r.id) {
        results[pos].goals.favor += m.homeTeamGoals;
        results[pos].goals.own += m.awayTeamGoals;
        results[pos].goals.balance = results[pos].goals.favor - results[pos].goals.own;
      }
    });
  });
  console.log(results);

  return results;
};

export const getAllAndNameTeam = async () => {
  const getAll = await getAllAndGoalsHome();
  const team = await Teams.findAll();
  getAll.forEach(async (t: any) => {
    const find = team.find((time) => time.id === t.id);
    const pos = getAll.map((e: any) => e.id).indexOf(t.id);
    getAll[pos].name = find?.teamName;
  });
  console.log(getAll);

  return getAll;
};

export const objectGetAll = async () => {
  const getAll = await getAllAndNameTeam();
  const {
    name,
    results: { victories, defeats, draws },
    goals: { favor, own, balance },
    points, games, efficiency } = getAll;
  return {
    name,
    totalPoints: points,
    totalGames: games,
    totalVictories: victories,
    totalDraws: draws,
    totalLosses: defeats,
    goalsFavor: favor,
    goalsOwn: own,
    goalsBalance: balance,
    efficiency,
  };
};
