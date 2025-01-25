import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const authToken = authHeader && authHeader.split(' ')[1];

  if (!authToken) throw new Error('Access token is missing or invalid!');

  jwt.verify(authToken, secret, (err) => {
    if (err) throw new Error('Invalid token!');
    next();
  });
}