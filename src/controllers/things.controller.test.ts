import { Response, Request, NextFunction } from 'express';

import { ThingsFileRepo } from '../repository/things.file.repo';
import { ThingsController } from './things.controller';

describe('Given ThingsController', () => {
  const repo: ThingsFileRepo = {
    write: jest.fn(),
    read: jest.fn(),
    readId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const controller = new ThingsController(repo);

  describe('getAll', () => {
    test('Then it should give us an array of objects assuming no errores', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.read).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should no tengo idea if there are any errors', async () => {
      (repo.read as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.read).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('getId', () => {
    test('Then it should give us one single object assuming no errors', async () => {
      await controller.get(req, resp, next);
      expect(repo.readId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should no tengo idea if there are any errors', async () => {
      (repo.read as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(repo.readId).toHaveBeenCalled();
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
      (repo.read as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('post', () => {
    test('Then it should create one single object assuming no errors', async () => {
      await controller.post(req, resp, next);
      expect(repo.write).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should no tengo idea if there are any errors', async () => {
      (repo.read as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);
      expect(repo.write).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('delete', () => {
    test('Then it should delete one single object assuming no errors', async () => {
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should no tengo idea if there are any errors', async () => {
      (repo.read as jest.Mock).mockRejectedValue(new Error());
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});