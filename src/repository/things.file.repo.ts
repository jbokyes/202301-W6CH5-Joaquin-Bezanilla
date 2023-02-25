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

  async write(info: Things) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const parsedData: Things[] = JSON.parse(data);
    const finalData = JSON.stringify([...parsedData, info]);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
    return 'Lets go! (write)';
  }
  update() {}
  delete() {}
}
