import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('plastics', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('name_en').notNullable();
    table.text('description').notNullable();
    table.string('bed_temp').notNullable();
    table.string('nozzle_temp').notNullable();
    table.string('color').defaultTo('#6b7280');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('plastics');
}
