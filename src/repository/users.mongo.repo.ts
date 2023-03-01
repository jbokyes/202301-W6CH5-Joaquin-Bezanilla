import { User } from '../entities/user.js';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface';
import createDebug from 'debug';
import { UserModel } from './user.mongo.model.js';
const debug = createDebug('W6:repo');

export class UsersMongoRepo implements Repo<User> {
  constructor() {
    debug('Insantiate');
  }

  async query(): Promise<User[]> {
    debug('query');
    const data = await UserModel.find();
    return data;
  }

  async queryId(id: string): Promise<User> {
    debug('queryId: ' + id);
    const data = await UserModel.findById(id);
    if (!data)
      throw new HTTPError(404, 'Id not found', 'Id not found in queryId');
    return data;
  }

  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = UserModel.find({ [query.key]: query.value });
    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('create: ' + info.email);
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<User>): Promise<User> {
    debug('update: ' + info.email);
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data)
      throw new HTTPError(404, 'Email not found', 'Email not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('delete: ' + id);
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Delete not possible',
        'Id not found for annihilation'
      );
  }
}
