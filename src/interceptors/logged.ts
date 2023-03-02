import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/errors.js';
import { Auth, PayloadToken } from '../helpers/auth.js';

export interface RequestPlus extends Request {
  info?: PayloadToken;
}

export function logged(req: RequestPlus, resp: Response, next: NextFunction) {
  const authHeader = req.get('Authorization');
  try {
    if (!authHeader)
      throw new HTTPError(498, 'Token invalid', 'No value in Auth header');
    if (!authHeader.startsWith('Bearer'))
      throw new HTTPError(498, 'Token invalid', 'No value in Auth header');
    const token = authHeader.slice(7);
    const payload = Auth.getTokenPayload(token);
    req.info = payload;
    next();
  } catch (error) {
    next(error);
  }
}
