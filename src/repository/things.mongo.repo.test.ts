import { ThingsMongoRepo } from './things.mongo.repo';
import { ThingModel } from './things.mongo.model';

jest.mock('./things.mongo.model');

describe('Given BearMongoRepo', () => {
  const repo = new ThingsMongoRepo();
  describe('When is called', () => {
    test('Then should be instanced', () => {
      expect(repo).toBeInstanceOf(ThingsMongoRepo);
    });
  });

  describe('When i use readAll', () => {
    test('Then should return the data', async () => {
      (ThingModel.find as jest.Mock).mockResolvedValue([]);
      const result = await repo.query();

      expect(ThingModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When i use ReadId', () => {
    test('Then should return the data', async () => {
      (ThingModel.findById as jest.Mock).mockResolvedValue({ id: '1' });

      const id = '1';
      const result = await repo.queryId(id);
      expect(ThingModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When i use create', () => {
    test('Then it should return an object if we give a valid id', async () => {
      (ThingModel.create as jest.Mock).mockResolvedValue([]);
      const newThing = {
        name: 'test',
        interestingScore: 1,
        importantScore: 1,
      };
      const result = await repo.create(newThing);
      expect(result).toStrictEqual([]);
    });
  });

  describe('When i use update', () => {
    test('Then it should return the updated object if it has the same id', async () => {
      (ThingModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'test',
        interestingScore: 1,
        importantScore: 1,
      });
      const result = await repo.update({
        id: '1',
        name: 'test1',
        interestingScore: 1,
        importantScore: 1,
      });
      expect(ThingModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        name: 'test',
        interestingScore: 1,
        importantScore: 1,
      });
    });

    test('When given a incorrect data it should thrown an erro', async () => {
      (ThingModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        '[{"id": "1"}]'
      );
      const id = '1';
      const result = await repo.destroy(id);
      expect(ThingModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
