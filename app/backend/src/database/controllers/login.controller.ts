import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import tokenGenerate from '../utils/jwtfuncs';

export default class LoginController {
  constructor(private _loginService: LoginService) {}

  async login(req: Request, res: Response) {
    const service = await this._loginService.login(req.body);
    if (!service) return res.status(401).json({ message: 'Incorrect email or password' });
    const token = tokenGenerate(req.body);
    return res.status(200).json({ token });
  }

  getRole = async (req: Request, res: Response) => {
    const result = await this._loginService.getRole(req.body.decoded);
    if (!result) res.status(401).json({ message: 'Unauthorized' });
    return res.status(200).json({ role: result });
  };
}
