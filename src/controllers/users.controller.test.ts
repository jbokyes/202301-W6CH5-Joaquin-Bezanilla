import { Response, Request, NextFunction } from 'express';
import { UsersMongoRepo } from '../repository/users.mongo.repo';
import { UsersController } from './users.controller';

describe('Given UsersController', () => {
  const repo: UsersMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    search: jest.fn(),
  };

  const req = {
    body: { email: 'a', passwd: 'a' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const controller = new UsersController(repo);

  describe('register', () => {
    test('Then it should create (post) a new object', async () => {
      await controller.register(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should do something else if there is any errors', async () => {
      (repo.create as jest.Mock).mockRejectedValue(new Error());
      await controller.register(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('login', () => {
    test('Then it should create a token in results', async () => {
      await controller.login(req, resp, next);
      expect(repo.search).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should do something else if there is any errors', async () => {
      (repo.search as jest.Mock).mockRejectedValue(new Error());
      await controller.login(req, resp, next);
      expect(repo.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
