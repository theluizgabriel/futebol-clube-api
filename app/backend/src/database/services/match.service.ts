// import * as bcrypt from 'bcryptjs';
// import { JwtPayload } from 'jsonwebtoken';
// import { IMatches } from '../entities/interfaces';
import { Request } from 'express';
import { IMatch } from '../entities/interfaces';
import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';
// import tokenGenerate from '../utils/jwtfuncs';

export default class MatchService {
  constructor(private matchModel = Matches) {}

  async getMatches(): Promise<IMatch[] | unknown> {
    const matches = await this.matchModel.findAll({
      include: [{
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }, {
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      ] });
    return matches;
  }

  async getMatchesByQuery(query: number): Promise<IMatch[] | unknown> {
    const matches = await this.matchModel.findAll({
      where: { inProgress: query },
      include: [{
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }, {
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      ],
    });
    return matches;
  }

  async createMatch(req: Request): Promise<IMatch | unknown> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.matchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: 1,
    });
    return match;
  }

  async finishMatch(id: number): Promise<boolean | null> {
    const update = await this.matchModel.update({ inProgress: 0 }, { where: { id } });

    if (update) return true;
    return null;
  }

  async updateScoreboard(req: Request): Promise<boolean | null> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const findTeam = await this.matchModel.findByPk(id);

    if (findTeam?.inProgress === 1) {
      await this.matchModel
        .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
      return true;
    }
    return false;
  }

  // async getTeamById(id: number): Promise<ITeam | null> {
  //   const user = await this.matchModel.findByPk(id);
  //   return user;
  // }
}
