import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Payload } from '../@types/users';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const has_token = req.headers.authorization;

  if (!has_token) return res.status(401).end();

  try {
    const token = has_token.split(' ')[1];

    req.user = verify(token, String(process.env.JWT_SECRET)) as Payload;

    next();
  } catch (error) {
    return res.status(401).end();
  }
};
