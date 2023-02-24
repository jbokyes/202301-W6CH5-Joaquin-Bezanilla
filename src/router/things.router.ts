import { Router } from 'express';
import { ThingsController } from '../controller/things.controller.js';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

export const thingsRouter = Router();
const repo = new ThingsFileRepo();
const controller = new ThingsController(repo);

thingsRouter.get('/', controller.getAll.bind(controller));
thingsRouter.get('/:id', controller.get.bind(controller));

// Pendientes
//thingsRouter.post('/', controller.post.bind(controller));
//thingsRouter.patch('/:id', controller.patch.bind(controller));
//thingsRouter.delete('/:id', controller.delete.bind(controller));
