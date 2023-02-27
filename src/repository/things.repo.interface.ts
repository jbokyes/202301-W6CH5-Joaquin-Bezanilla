export interface Repo<Thing> {
  read(): Promise<Thing[]>;
  readId(id: string): Promise<Thing>;
  write(info: Partial<Thing>): Promise<Thing>;
  update(info: Partial<Thing>): Promise<Thing>;
  delete(id: string): Promise<void>;
}
