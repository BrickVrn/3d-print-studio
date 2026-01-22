import { knex, type Knex } from 'knex';

const getDbHost = () => {
  if (process.env.DB_HOST) {
    return process.env.DB_HOST;
  }
  
  return process.env.NODE_ENV === 'production' ? 'host.docker.internal' : 'localhost';
};

const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: getDbHost(),
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || '3d_print_studio',
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export const db = knex(config);

export async function close(): Promise<void> {
  await db.destroy();
}