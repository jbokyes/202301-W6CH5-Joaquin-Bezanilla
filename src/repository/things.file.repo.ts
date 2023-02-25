import fs from 'fs/promises';

const file = './data/data.json';

export type Things = {
  id: number;
  name: string;
};

export interface ThingsRepoStructure {
  read(): Promise<Things[]>;
  write(info: Things): Promise<string | object>;
}

export class ThingsFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Things[]);
  }

  async readId(id: Things['id']) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Things[] = JSON.parse(data);
    return parsedData.filter((thing) => thing.id === id)[0];
  }

  async write(info: Things) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const parsedData: Things[] = JSON.parse(data);
    const finalData = JSON.stringify([...parsedData, info]);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
    return 'Lets go! (write)';
  }
  async update(info: Things) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const parsedData: Things[] = JSON.parse(data);
    const updatedData = JSON.stringify(
      parsedData.map((item) => (item.id === info.id ? info : item))
    );
    await fs.writeFile(file, updatedData, 'utf-8');
  }
  async delete(id: Things['id']) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Things[] = JSON.parse(data);
    const finalData = JSON.stringify(
      parsedData.filter((item) => item.id !== id)
    );
    await fs.writeFile(file, finalData, 'utf-8');
  }
}
