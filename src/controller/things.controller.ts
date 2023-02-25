import { Response, Request } from 'express';
import { Things, ThingsFileRepo } from '../repository/things.file.repo.js';

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

  post(req: Request, resp: Response) {
    console.log(req.body);
    this.repo.write(req.body).then((data) => console.log(data));
    resp.send(`<p> Post!</p>`);
  }

  async patch(req: Request, resp: Response) {
    const {
      params: { id },
    } = req;
    if (!id) {
      return;
    }
    const updateInfo = req.body as Partial<Things>;
    const dataToUpdate = await this.repo.readId(Number(req.params.id));
    const updatedThing = Object.assign(dataToUpdate, updateInfo);
    console.log(updatedThing);
    await this.repo.update(updatedThing);
    resp.send(`<p>Just updated a ' + ${id}</p>`);
  }

  async delete(req: Request, resp: Response) {
    await this.repo.delete(Number(req.params.id));
    resp.send(`<p>Deleted item ${req.params.id}`);
  }
}
