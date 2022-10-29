import { objectGetAllAway } from './leaderboardAwayFuncs';
import { objectGetAllHome } from './leaderboardHomeFuncs';

export async function getLeaderboard() {
  const tableHome = await objectGetAllHome();
  const tableAway = await objectGetAllAway();
  tableHome.forEach((team: any) => {
    tableAway.forEach((time: any) => {
      const t2 = time;
      if (t2.name === team.name) {
        t2.totalPoints += team.totalPoints;
        t2.totalGames += team.totalGames;
        t2.totalVictories += team.totalVictories;
        t2.totalDraws += team.totalDraws;
        t2.totalLosses += team.totalLosses;
        t2.goalsFavor += team.goalsFavor;
        t2.goalsOwn += team.goalsOwn;
        t2.goalsBalance += team.goalsBalance;
      }
    });
  });
  return tableAway;
}

export async function getLeaderboardEfficiency() {
  const principalTable = await getLeaderboard();
  principalTable.forEach((t: any) => {
    const team = t;
    const calculate = (team.totalPoints / (team.totalGames * 3)) * 100;
    team.efficiency = (Number(calculate.toFixed(2)));
  });
  return principalTable;
}
