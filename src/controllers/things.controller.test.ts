import { Response, Request, NextFunction } from 'express';

import { ThingsMongoRepo } from '../repository/things.mongo.repo';
import { UsersMongoRepo } from '../repository/users.mongo.repo';
import { ThingsController } from './things.controller';

describe('Given ThingsController', () => {
  const repo: ThingsMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    search: jest.fn(),
  };

  const userRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    search: jest.fn(),
  } as UsersMongoRepo;
  const req = {
    body: {},
    params: { id: '' },
    info: { id: '12' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const controller = new ThingsController(repo, userRepo);

  describe('getAll', () => {
    test('Then it should give us an array of objects assuming no errores', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should catch next if there are any errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('getId', () => {
    test('Then it should give us one single object assuming no errors', async () => {
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should no tengo idea if there are any errors', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('patch', () => {
    test('Then it should change one single existing object assuming no errors', async () => {
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should no tengo idea if there are any errors', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('post', () => {
    test('Then it should create one single object assuming no errors', async () => {
      await controller.post(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(repo.create).toHaveBeenCalled();
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should catch next if there are any errors', async () => {
      (repo.create as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('delete', () => {
    test('Then it should delete one single object assuming no errors', async () => {
      await controller.delete(req, resp, next);
      expect(repo.destroy).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should no tengo idea if there are any errors', async () => {
      (repo.destroy as jest.Mock).mockRejectedValue(new Error());
      await controller.delete(req, resp, next);
      expect(repo.destroy).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
