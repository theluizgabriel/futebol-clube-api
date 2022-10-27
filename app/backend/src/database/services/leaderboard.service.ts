import { ILeaderboard } from '../entities/interfaces';
import Teams from '../models/TeamsModel';
import { getAllAndGoalsHome } from '../utils/leaderboardHomeFuncs';

export default class LeaderboardService {
  constructor(private _teamsModel = Teams, private _tableHome = {}) {}

  async getTableHome(): Promise<ILeaderboard> {
    const leaderboard = await getAllAndGoalsHome();
    this._tableHome = leaderboard;
    return leaderboard;
  }
}
