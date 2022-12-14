import * as bcrypt from 'bcryptjs';
// import { JwtPayload } from 'jsonwebtoken';
import Users from '../models/UsersModel';
import { ILogin } from '../entities/interfaces';
// import tokenGenerate from '../utils/jwtfuncs';

export default class LoginService {
  constructor(private userModel = Users) {}

  async login(data: ILogin): Promise<boolean> {
    const user = await this.userModel.findAll({ where: {
      email: data.email,
    } });

    if (!user[0]) return false;

    const result = bcrypt.compareSync(data.password, user[0]?.password);
    return result;
  }

  async getRole(data: ILogin): Promise<string> {
    const user = await this.userModel.findAll({ where: { email: data.email } });
    return user[0].role;
  }
}
