import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dbConnection: PostgresConnectionOptions = {
  type: 'postgres',
  port: process.env.DB_PORT as unknown as number,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER ?? '',
  password: process.env.DB_PASSWORD,
  entities: ['src/db/entity/**/*.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  migrationsRun: true,
  synchronize: false,
  subscribers: ['src/db/subscribers/*.ts'],
  dropSchema: false,
};

export const AppDataSource = new DataSource(dbConnection);

const MAX_TRIES = 10;

function exponentialBackoff(nTry: number): Promise<void> {
  const delay = 0.5 * Math.pow(2, nTry);
  return new Promise((resolve) => {
    setTimeout(resolve, delay * 1000);
  });
}

export async function connectDB() {
  for (let nTry = 0; nTry < MAX_TRIES; nTry++) {
    try {
      await AppDataSource.initialize();
      console.log('established successful connection to appDataSource');
      return;
    } catch (error) {
      console.debug(`failed to connect to db: ${error}`);
      await exponentialBackoff(nTry);
    }
  }

  throw new Error(`failed to connect to database in ${MAX_TRIES} attempts`);
}
