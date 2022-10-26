import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Users from '../models/UsersModel';

const secret = process.env.JWT_SECRET || 'jwt_secret';
const message = 'Token must be a valid token';

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');
  if (!token) return res.status(401).json({ message });
  try {
    const decoded = jwt.verify(token, secret);
    req.body.decoded = decoded;
  } catch (_e) {
    return res.status(401).json({ message });
  }
  next();
}

async function validateTokenExists(req: Request, res: Response, next: NextFunction) {
  const { decoded } = req.body;
  const { email, password } = decoded;
  const user = await Users.findAll({ where: { email } });
  const result = bcrypt.compareSync(password, user[0]?.password);
  if (!result) {
    res.status(401).json({ message });
  } else {
    next();
  }
}

export {
  validateToken,
  validateTokenExists,
};
