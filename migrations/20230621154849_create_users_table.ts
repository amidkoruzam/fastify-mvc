import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id");
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {}
