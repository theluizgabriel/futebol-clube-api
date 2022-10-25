import { Request, Response } from 'express';
import MatchService from '../services/match.service';
// import tokenGenerate from '../utils/jwtfuncs';

export default class MatchController {
  constructor(private _matchService: MatchService) {}

  async getMatches(req: Request, res: Response) {
    const teams = await this._matchService.getMatches();
    return res.status(200).json(teams);
  }

  async getMatchesByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (`${inProgress}` === 'true') {
      const teams = await this._matchService.getMatchesByQuery(1);
      return res.status(200).json(teams);
    }
    if (`${inProgress}` === 'false') {
      const teams = await this._matchService.getMatchesByQuery(0);
      return res.status(200).json(teams);
    }
    return res.status(404).json({ message: 'Incorrect value' });
  }
}
