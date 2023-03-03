import { Router } from 'express';
import { ThingsController } from '../controllers/things.controller.js';
import { authorized } from '../interceptors/authorized.js';
import { logged } from '../interceptors/logged.js';
import { ThingsMongoRepo } from '../repository/things.mongo.repo.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

// eslint-disable-next-line new-cap
export const thingsRouter = Router();
// Const repo = new ThingsFileRepo();
const repoThings = ThingsMongoRepo.getInstance();
const repoUsers = UsersMongoRepo.getInstance();
const controller = new ThingsController(repoThings, repoUsers);

thingsRouter.get('/', controller.getAll.bind(controller));
thingsRouter.get('/:id', controller.get.bind(controller));
thingsRouter.post('/', logged, controller.post.bind(controller));
thingsRouter.patch(
  '/:id',
  logged,
  (req, resp, next) => authorized(req, resp, next, repoThings),
  controller.patch.bind(controller)
);
thingsRouter.delete(
  '/:id',
  logged,
  (req, resp, next) => authorized(req, resp, next, repoThings),
  controller.delete.bind(controller)
);
