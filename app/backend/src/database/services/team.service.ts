// import * as bcrypt from 'bcryptjs';
// import { JwtPayload } from 'jsonwebtoken';
import Teams from '../models/TeamsModel';
import { ITeams } from '../entities/interfaces';
// import tokenGenerate from '../utils/jwtfuncs';

export default class TeamService {
  constructor(private teamModel = Teams) {}

  async getTeams(): Promise<ITeams> {
    const user = await this.teamModel.findAll();
    return user;
  }
}
