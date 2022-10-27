import { ILeaderboard } from '../entities/interfaces';
import Teams from '../models/TeamsModel';
import { getAllHome } from '../utils/leaderboardHomeFuncs';

export default class LeaderboardService {
  constructor(private _teamsModel = Teams, private _tableHome = {}) {}

  async getTableHome(): Promise<ILeaderboard[] | any> {
    const leaderboard = await getAllHome();
    this._tableHome = leaderboard;
    return leaderboard;
  }
}
