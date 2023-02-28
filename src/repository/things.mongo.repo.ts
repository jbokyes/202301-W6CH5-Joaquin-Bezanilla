import { Thing } from '../entities/thing.js';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface.js';
import { ThingModel } from './things.mongo.model.js';
import createDebug from 'debug';
const debug = createDebug('W6:repo');

export class ThingsMongoRepo implements Repo<Thing> {
  constructor() {
    debug('Insantiate');
  }

  async query(): Promise<Thing[]> {
    debug('query');
    const data = await ThingModel.find();
    return data;
  }

  async queryId(id: string): Promise<Thing> {
    debug('queryId: ' + id);
    const data = await ThingModel.findById(id);
    if (!data)
      throw new HTTPError(404, 'Id not found', 'Id not found in queryId');
    return data;
  }

  async create(info: Partial<Thing>): Promise<Thing> {
    debug('create: ' + info.id);
    const data = await ThingModel.create(info);
    return data;
  }

  async update(info: Partial<Thing>): Promise<Thing> {
    debug('update: ' + info.id);
    const data = await ThingModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data)
      throw new HTTPError(404, 'Id not found', 'Id not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('delete: ' + id);
    const data = await ThingModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Delete not possible',
        'Id not found for annihilation'
      );
  }
}
