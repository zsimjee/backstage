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

import {
  getRootLogger,
  PluginDatabaseManager,
} from '@backstage/backend-common';
import { Config } from '@backstage/config';
import { Logger } from 'winston';
import { LogHandler } from '../features';
import { Database } from '../internal/Database';

export class DebugBuilder {
  static create(options: { database: PluginDatabaseManager; config: Config }) {
    return new DebugBuilder(options.database, options.config);
  }

  private database: Database | undefined;

  private constructor(
    private readonly databaseManager: PluginDatabaseManager,
    private readonly config: Config,
  ) {
    this.database = undefined;
  }

  handleLogs(options?: { rootLogger: Logger }): LogHandler {
    const rootLogger = options?.rootLogger ?? getRootLogger();
    const database = this.getOrCreateDatabase();

    return LogHandler.create({
      logger: rootLogger,
      database: this.database,
    });
  }

  private async getOrCreateDatabase(): Promise<Database> {
    if (this.database) {
      return this.database;
    }

    const database = await Database.create({
      databaseManager: this.databaseManager,
    });

    this.database = database;
    return database;
  }
}
