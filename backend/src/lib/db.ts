import { knex, type Knex } from 'knex';

const config: Knex.Config = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/3d_print_studio',
  pool: {
    min: 2,
    max: 10,
  },
};

export const db = knex(config);

export async function close(): Promise<void> {
  await db.destroy();
}