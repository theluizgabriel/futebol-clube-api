import { ILeaderboard } from '../entities/interfaces';
import Teams from '../models/TeamsModel';
import { objectGetAllAway } from '../utils/leaderboardAwayFuncs';
import { getLeaderboardEfficiency } from '../utils/leaderboardComplete';
import { getAllSort, getAllSort2, objectGetAllHome } from '../utils/leaderboardHomeFuncs';

export default class LeaderboardService {
  constructor(
    private _teamsModel = Teams,
    private _tableHome = {},
    private _tableAway = {},
    private _tablePrincipal: any = {},
  ) {}

  async getTableHome(): Promise<ILeaderboard[]> {
    const array = await objectGetAllHome();
    const arraySort = await getAllSort(array);
    const leaderboard = getAllSort2(arraySort);
    this._tableHome = leaderboard;
    return leaderboard;
  }

  async getTableAway(): Promise<ILeaderboard[]> {
    const array = await objectGetAllAway();
    const arraySort = await getAllSort(array);
    const leaderboard = getAllSort2(arraySort);
    this._tableAway = leaderboard;
    return leaderboard;
  }

  async getCompleteTable(): Promise<ILeaderboard[]> {
    const array = await getLeaderboardEfficiency();
    const arraySort = await getAllSort(array);
    const leaderboard = getAllSort2(arraySort);
    this._tablePrincipal = leaderboard;
    return leaderboard;
  }
}
