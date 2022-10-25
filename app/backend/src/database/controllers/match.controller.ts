import { Request, Response } from 'express';
import MatchService from '../services/match.service';
// import tokenGenerate from '../utils/jwtfuncs';

export default class MatchController {
  constructor(private _matchService: MatchService) {}

  async getMatches(req: Request, res: Response) {
    const teams = await this._matchService.getMatches();
    return res.status(200).json(teams);
  }
}
