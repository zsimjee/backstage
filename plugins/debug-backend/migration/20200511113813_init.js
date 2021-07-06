/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-check

/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function up(knex) {
  await knex.schema.createTable('logs', table => {
    table.comment('Keeps track of log events');
    table
      .bigIncrements('id')
      .primary()
      .notNullable()
      .comment('Auto-generated ID of the event');
    table
      .timestamp('inserted_at')
      .notNullable()
      .comment('The time that the entry was inserted into the database');
    table
      .timestamp('generated_at')
      .notNullable()
      .comment('Generation time of the log event');
    table.string('level').notNullable().comment('Log level');
    table.string('message').notNullable().comment('Log message');
    table.string('error').nullable().comment('Serialized error, if present');
    table
      .string('meta')
      .notNullable()
      .comment(
        'Other meta fields of the log event, as a JSON stringified object',
      );
    table.index(['inserted_at'], 'logs_inserted_at_idx');
    table.index(['level'], 'logs_level_idx');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function down(knex) {
  await knex.schema.alterTable('logs', table => {
    table.dropIndex([], 'logs_inserted_at_idx');
    table.dropIndex([], 'logs_level_idx');
  });
  await knex.schema.dropTable('logs');
};
