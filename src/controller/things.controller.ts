import { Response, Request } from 'express';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

export class ThingsController {
  constructor(public repo: ThingsFileRepo) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      console.log(data);
      const id = req.params.id;
      const specificData = data.find((item) => item.id === Number(id));

      resp.json(specificData);
    });
  }

  post(req: Request, _resp: Response) {
    console.log(req.body);
    this.repo.write(req.body).then((data) => console.log(data));
  }
}
