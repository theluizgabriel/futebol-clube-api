import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import tokenGenerate from '../utils/jwtfuncs';
// import { ILogin } from '../entities/interfaces';

export default class LoginController {
  constructor(private _loginService: LoginService) {}

  async login(req: Request, res: Response) {
    try {
      const login = await this._loginService.login(req.body);
      if (!login) return res.status(401).json({ message: 'error' });
      const token = tokenGenerate(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).send(`Não foi possível salvar com o erro ${error}`);
    }
  }
}
