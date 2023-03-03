import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user';
import { HTTPError } from '../errors/errors.js';
import { Auth, PayloadToken } from '../helpers/auth.js';
import { Repo } from '../repository/repo.interface';

const debug = createDebug('W6:controller-users');
export class UsersController {
  // eslint-disable-next-line no-unused-vars
  constructor(public repo: Repo<User>) {
    debug('Instantiate');
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll', this.repo);
      const data = await this.repo.query();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('register-post');
      if (!req.body.email || !req.body.passwd) {
        throw new HTTPError(403, 'Unauthorized', 'Invalid email or password');
      }
      req.body.passwd = await Auth.hash(req.body.passwd);
      req.body.things = [];
      const data = await this.repo.create(req.body);
      console.log(data);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('login-post');
      if (!req.body.email || !req.body.passwd)
        throw new HTTPError(403, 'Unauthorized', 'Invalid email or password');
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      if (!data.length)
        throw new HTTPError(403, 'Unauthorized', 'Email not found');
      if (!(await Auth.compare(req.body.passwd, data[0].passwd)))
        throw new HTTPError(403, 'Unauthorized', 'Password not found');
      const payload: PayloadToken = {
        id: data[0].id,
        email: req.body.email,
        role: 'admin',
      };
      const token = Auth.createJWT(payload);
      resp.json({
        results: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
