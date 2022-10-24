import * as express from 'express';
import LoginController from '../controllers/login.controller';
import Users from '../models/UsersModel';
import LoginService from '../services/login.service';

const router = express.Router();

const loginController = new LoginController(new LoginService(Users));

router.get('/', (_req, res) => { res.status(200).send('ok'); });
router.post('/', async (req, res) => { loginController.login(req, res); });

export default router;
