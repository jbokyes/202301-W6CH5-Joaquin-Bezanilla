import debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/errors.js';
import { ThingsMongoRepo } from '../repository/things.mongo.repo.js';
import { RequestPlus } from './logged.js';

export async function authorized(
  req: RequestPlus,
  resp: Response,
  next: NextFunction,
  thingsRepo: ThingsMongoRepo
) {
  try {
    debug('Called');
    if (!req.info)
      throw new HTTPError(
        498,
        'Token not found',
        'Token not found in authorized interceptor'
      );
    // Tengo el id del usuario (req.info.id) --> el nombre info puede ser cualquier cosa. depende del middleware anterior. en este caso viene del RequestPlus, interfaz que creamos, implementa Request y le agrega info como payload token.
    const userId = req.info?.id;
    // Tengo el id de la COSA (req.params.id)
    const thingId = req.params.id;
    // Busco la cosa
    const thing = await thingsRepo.queryId(thingId);
    // Comparo cosa.owner.id con el id del usuario (req.info.id)
    if (thing.owner.id !== userId)
      throw new HTTPError(401, 'Not authorized', 'Id from user not authorized');
    next();
  } catch (error) {
    next(error);
  }
}
