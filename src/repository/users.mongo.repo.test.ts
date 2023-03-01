import { HTTPError } from '../errors/errors';
import { UserModel } from './user.mongo.model';
import { UsersMongoRepo } from './users.mongo.repo';

jest.mock('./user.mongo.model');

describe('Given UserMongoRepo', () => {
  const repo = new UsersMongoRepo();
  describe('When is called', () => {
    test('Then should be instanced', () => {
      expect(repo).toBeInstanceOf(UsersMongoRepo);
    });
  });

  describe('When i use query', () => {
    test('Then should return the data', async () => {
      (UserModel.find as jest.Mock).mockResolvedValue([]);
      const result = await repo.query();

      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When i use ReadId', () => {
    test('Then should return the data', async () => {
      (UserModel.findById as jest.Mock).mockResolvedValue({ id: '1' });

      const id = '1';
      const result = await repo.queryId(id);
      expect(UserModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });
  describe('When i use search', () => {
    test('Then should return the data', async () => {
      const query = { key: 'test', value: 'otrotest' };
      (UserModel.find as jest.Mock).mockResolvedValue([query]);
      const result = await repo.search(query);
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual([query]);
    });
  });

  /* describe('When i use ReadId and cant fetch data', () => {
    test('Then  it should return HTTPError', async () => {
      (UserModel.findById as jest.Mock).mockResolvedValue(undefined);
      const id = '2';
      const result = await repo.queryId(id);
      expect(UserModel.findById).toHaveBeenCalled();
      expect(async () => result).rejects.toThrow();
    });
  }); */

  describe('When i use create', () => {
    test('Then it should return an object if we give a valid id', async () => {
      (UserModel.create as jest.Mock).mockResolvedValue([]);
      const newThing = {
        email: 'test',
        interestingScore: 1,
        importantScore: 1,
      };
      const result = await repo.create(newThing);
      expect(result).toStrictEqual([]);
    });
  });

  describe('When i use update', () => {
    test('Then it should return the updated object if it has the same id', async () => {
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '1',
        email: 'test',
      });
      const result = await repo.update({
        id: '1',
        email: 'test1',
      });
      expect(UserModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        email: 'test',
      });
    });

    test('When given a incorrect data it should thrown an erro', async () => {
      (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        '[{"id": "1"}]'
      );
      const id = '1';
      const result = await repo.destroy(id);
      expect(UserModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
