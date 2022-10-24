import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import ILogin from '../entities/interfaces';

dotenv.config();

const secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
const tokenGenerate = (data: ILogin) => jwt.sign(data, secret);

export default tokenGenerate;
