import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private _leaderboardService: LeaderboardService) {}

  async getTableHome(req: Request, res: Response) {
    const table = await this._leaderboardService.getTableHome();
    return res.status(200).json(table);
  }
}
