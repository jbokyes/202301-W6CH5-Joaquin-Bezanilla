import { Response, Request } from 'express';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

export class ThingsController {
  constructor(public repo: ThingsFileRepo) {}

  getAll(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      console.log(data);
      const id = req.params.id;
      const qlq = data.find((item) => item.id === Number(id));

      resp.json(qlq);
    });
  }
}
