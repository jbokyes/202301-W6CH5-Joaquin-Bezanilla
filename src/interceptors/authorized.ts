import { NextFunction, Request, Response } from 'express';
import { RequestPlus } from './logged.js';

export function authorized(
  req: RequestPlus,
  resp: Response,
  next: NextFunction
) {}
