import { Request, Response } from 'express';
import MatchService from '../services/match.service';
// import tokenGenerate from '../utils/jwtfuncs';

export default class MatchController {
  constructor(private _matchService: MatchService) {}

  async getMatches(req: Request, res: Response) {
    const matches = await this._matchService.getMatches();

    return res.status(200).json(matches);
  }

  async getMatchesByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (`${inProgress}` === 'true') {
      const matches = await this._matchService.getMatchesByQuery(1);
      return res.status(200).json(matches);
    }
    if (`${inProgress}` === 'false') {
      const matches = await this._matchService.getMatchesByQuery(0);
      return res.status(200).json(matches);
    }
    return res.status(404).json({ message: 'Incorrect value' });
  }

  async createMatch(req: Request, res: Response) {
    const match = await this._matchService.createMatch(req);
    return res.status(201).json(match);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this._matchService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateScoreboard(req: Request, res: Response) {
    const update = await this._matchService.updateScoreboard(req);

    if (update === true) { return res.status(200).end(); }
    return res.status(422).end({ message: 'alterado com sucesso' });
  }
}
