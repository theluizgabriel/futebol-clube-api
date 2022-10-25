// import * as bcrypt from 'bcryptjs';
// import { JwtPayload } from 'jsonwebtoken';
// import { IMatches } from '../entities/interfaces';
import { IMatch } from '../entities/interfaces';
import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';
// import tokenGenerate from '../utils/jwtfuncs';

export default class MatchService {
  constructor(private matchModel = Matches) {}

  async getMatches(): Promise<IMatch[] | unknown> {
    const user = await this.matchModel.findAll({
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
    return user;
  }

  // async getTeamById(id: number): Promise<ITeam | null> {
  //   const user = await this.matchModel.findByPk(id);
  //   return user;
  // }
}
