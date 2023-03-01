import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { thingsRouter } from './router/things.router.js';
import createDebug from 'debug';
import { CustomError, HTTPError } from './errors/errors.js';
import { usersRouter } from './router/users.router.js';

const debug = createDebug('W6:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

// Modo más organizado de hacerlo
// Ejemplo para una ruta

app.use('/things', thingsRouter);
app.use('/users', usersRouter);
app.get('/', (_req, resp) => {
  resp.json({
    info: "Bootcamp API's",
    endpoints: {
      things: '/things',
      users: '/users',
    },
  });
});
app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Soy el middleware de errores');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
    debug(status, statusMessage, error.message);
  }
);
