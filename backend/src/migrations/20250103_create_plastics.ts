import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('plastics', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.text('description_en');
    table.string('bed_temp');
    table.string('nozzle_temp');
    table.jsonb('properties').defaultTo('[]');
    table.jsonb('applications').defaultTo('[]');
    table.string('color');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('plastics');
}