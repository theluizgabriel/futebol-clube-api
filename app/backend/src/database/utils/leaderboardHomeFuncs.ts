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

const getVictoriesHome = async () => {
  const array = await getTeams();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allVictoriesHome = allMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);

  allVictoriesHome.forEach((m) => {
    const id = m.homeTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.victories += 1; }
  });

  return array;
};

const getDefeatsWVictoriesHome = async () => {
  const array = await getVictoriesHome();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allDefeatsHome = allMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

  allDefeatsHome.forEach((m) => {
    const id = m.homeTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.defeats += 1; }
  });

  return array;
};

const getDrawsWVAndDHome = async () => {
  const array = await getDefeatsWVictoriesHome();
  const allMatches = await Matches.findAll({ where: { inProgress: false } });
  const allDrawsHome = allMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);

  allDrawsHome.forEach((m) => {
    const id = m.homeTeam;
    const pos = array.map((e: any) => e.id).indexOf(id);
    if (pos > -1) { array[pos].results.draws += 1; }
  });

  return array;
};

const calculatePointsHome = async () => {
  const results = await getDrawsWVAndDHome();
  results.forEach((r: any) => {
    const pos = results.map((e: any) => e.id).indexOf(r.id);
    const victories = r.results.victories * 3;
    const { draws } = r.results;
    results[pos].points = victories + draws;
  });

  return results;
};

export const calculateEfficiencyHome = async () => {
  const results = await calculatePointsHome();
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

const getAllAndGoalsHome = async () => {
  const results = await calculateEfficiencyHome();
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

  return results;
};

const getAllAndNameTeamHome = async () => {
  const getAll = await getAllAndGoalsHome();
  const team = await Teams.findAll();
  getAll.forEach(async (t: any) => {
    const find = team.find((time) => time.id === t.id);
    const pos = getAll.map((e: any) => e.id).indexOf(t.id);
    getAll[pos].name = find?.teamName;
  });

  return getAll;
};

const objectGetAllHome = async () => {
  const getAll = await getAllAndNameTeamHome();
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

const getAllSortHome = async () => {
  const object = await objectGetAllHome();
  const order = object.sort((a: any, b: any) => {
    if (a.goalsOwn < b.goalsOwn) return -1;
    if (a.goalsOwn > b.goalsOwn) return 1;
    if (a.goalsOwn === b.goalsOwn) {
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
    }
    return 0;
  });
  return order;
};

export const getAllHome = async () => {
  const object = await getAllSortHome();
  const order = object.sort((a: any, b: any) => {
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance === b.goalsBalance) {
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
    }
    return 0;
  });
  const order2 = order.sort((a: any, b: any) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    return 0;
  });
  return order2;
};
