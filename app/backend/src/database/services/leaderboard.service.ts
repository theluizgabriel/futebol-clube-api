import { ILeaderboard } from '../entities/interfaces';
import Teams from '../models/TeamsModel';
import { getAllAway } from '../utils/leaderboardAwayFuncs';
import { getAllHome } from '../utils/leaderboardHomeFuncs';

export default class LeaderboardService {
  constructor(private _teamsModel = Teams, private _tableHome = {}) {}

  async getTableHome(): Promise<ILeaderboard[]> {
    const leaderboard = await getAllHome();
    this._tableHome = leaderboard;
    return leaderboard;
  }

  async getTableAway(): Promise<ILeaderboard[]> {
    const leaderboard = await getAllAway();
    this._tableHome = leaderboard;
    return leaderboard;
  }
}
