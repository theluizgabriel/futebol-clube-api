import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  const decoded = jwt.verify(token, secret);
  req.body.decoded = decoded;
  next();
}

export default validateToken;
