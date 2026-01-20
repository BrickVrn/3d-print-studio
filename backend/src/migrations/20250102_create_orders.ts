import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('client_name').notNullable();
    table.string('client_email').notNullable();
    table.string('client_phone');
    table.text('description').notNullable();
    table.jsonb('file_urls').defaultTo('[]');
    table.enum('status', ['new', 'in_progress', 'completed', 'cancelled']).defaultTo('new');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
}