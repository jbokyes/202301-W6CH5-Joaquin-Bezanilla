import fs from 'fs/promises';
import { Repo } from './things.repo.interface';
import { Thing } from '../entities/thing';
const file = './data/data.json';

export class ThingsFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Thing[]);
  }

  async readId(id: Partial<Thing>) {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Thing[] = JSON.parse(initialData);
    const finalData = data.find((item) => item.id === id);
    if (!finalData) throw new Error('Id not found');
    return finalData;
  }

  async write(info: Thing) {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Thing[] = JSON.parse(initialData);
    const finalData = [...data, info];
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return info as Thing;
  }
  async update(info: Thing) {
    if (!info.id) throw new Error('Not valid data');
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Thing[] = JSON.parse(initialData);
    let updatedItem: Thing = {} as Thing;
    const finalData = data.map((item) => {
      if (item.id === info.id) {
        updatedItem = { ...item, ...info };
        return updatedItem;
      }
      return item;
    });
    if (!updatedItem.id) throw new Error('Id not found');
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return updatedItem as Thing;
  }
  async delete(id: string) {
    const initialData: string = await fs.readFile(file, {
      encoding: 'utf-8',
    });
    const data: Thing[] = JSON.parse(initialData);
    const index = data.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Id not found');
    data.slice(index, 1);
    await fs.writeFile(file, JSON.stringify(data), 'utf-8');
  }
}
