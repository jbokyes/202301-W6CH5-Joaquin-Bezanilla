import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

// eslint-disable-next-line new-cap
export const usersRouter = Router();

const repo = UsersMongoRepo.getInstance();
const controller = new UsersController(repo);

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
// usersRouter.patch('/addfav/:id', controller.addFav.bind(controller));
// usersRouter.patch('/changefav/:id', controller.changeFav.bind(controller));
// usersRouter.patch('/deletefav/:id', controller.deleteFav.bind(controller));
