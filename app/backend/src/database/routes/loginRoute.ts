import * as express from 'express';
import LoginController from '../controllers/login.controller';
import Users from '../models/UsersModel';
import LoginService from '../services/login.service';
import validateFields from '../utils/loginValidate';
import { validateToken } from '../utils/tokenValidate';

const router = express.Router();

const loginController = new LoginController(new LoginService(Users));

router.get('/validate', validateToken, async (req, res) => { loginController.getRole(req, res); });
router.post('/', validateFields, async (req, res) => { loginController.login(req, res); });

export default router;
