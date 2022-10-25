import { Request, Response } from 'express';
import TeamService from '../services/team.service';
// import tokenGenerate from '../utils/jwtfuncs';

export default class TeamController {
  constructor(private _teamService: TeamService) {}

  async getTeams(req: Request, res: Response) {
    const teams = await this._teamService.getTeams();
    return res.status(200).json(teams);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this._teamService.getTeamById(Number(id));
    return res.status(200).json(team);
  }
}
