import { Thing, ThingsFileRepo } from './things.file.repo';
import fs from 'fs/promises';
jest.mock('fs/promises');

describe('Given ThingsFileRepo', () => {
  const repo = new ThingsFileRepo();
  test('Then it could be instantiated', () => {
    expect(repo).toBeInstanceOf(ThingsFileRepo);
  });

  describe('When i use read', () => {
    test('Then it should return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.read();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When i use readID', () => {
    test('Then it should return an object if it has a valid id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const id = '1';
      const result = await repo.readId(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then it should throw an error if it doesnt have a valid ID', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"2"}]');
      const id = '1';
      expect(async () => repo.readId(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
    test('Then it should throw an error', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{"id": "2", "name": "Chop", "height": "200 cm", "type": "Black Bear", "weight": "300 kg"}]'
      );
      const id: Partial<Thing> = {
        name: 'Chop',
        interestingScore: 1,
        importantScore: 1,
      };

      expect(async () => repo.update(id)).rejects.toThrowError();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('When i use update', () => {
    test('Then it should return an object if it has matching ids', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const info = { id: '1' };
      const result = await repo.update(info);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then it should throw an error if it doesnt have matching ids', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"3"}]');
      const info = { id: '2' };
      expect(fs.readFile).toHaveBeenCalled();
      expect(async () => repo.update(info)).rejects.toThrow();
    });
  });
  describe('When i use delete', () => {
    test('Then it should get rid of the object with matching ids', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const info = '1';
      const result = await repo.delete(info);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });
    test('Then it should throw an error when theres no matching ids', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"2"}]');
      const info = '1';
      expect(fs.readFile).toHaveBeenCalled();
      expect(async () => repo.delete(info)).rejects.toThrow();
    });
  });
  describe('When i use write', () => {
    test('Then it should create a new object', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{}]');
      const info = {
        id: '1',
        name: 'j',
        interestingScore: 1,
        importantScore: 1,
      };
      const result = await repo.write(info);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(info);
    });
  });
});
