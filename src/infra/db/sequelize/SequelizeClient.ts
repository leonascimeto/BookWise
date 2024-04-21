import { Dialect, Options, Sequelize } from 'sequelize';

import * as enviroments from '../../utils/enviroments';

export class SequelizeClient {
  private static instance: Sequelize;

  static getInstance(): Sequelize {
    if (!SequelizeClient.instance) {
      const options: Options = enviroments.NODE_ENV === 'test' ? this.testConfig : this.prodConfig;
      SequelizeClient.instance = new Sequelize(options);
    }

    return SequelizeClient.instance;
  }

  private static testConfig: Options = {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
    sync: { force: true },
  };

  private static prodConfig: Options = {
    dialect: enviroments.DB_DIALECT as Dialect,
    host: enviroments.DB_HOST,
    port: parseInt(enviroments.DB_PORT as string),
    ssl: enviroments.DB_SSL === 'true',
    username: enviroments.DB_USER,
    password: enviroments.DB_PASSWORD,
    database: enviroments.DB_NAME,
    logging: enviroments.DB_LOGGING === 'true',
    sync: { force: enviroments.DB_SYNC_FORCE === 'true' },
    pool: {
      max: parseInt(enviroments.DB_POOL_MAX as string),
      acquire: parseInt(enviroments.DB_POOL_ACQUIRE as string),
      idle: parseInt(enviroments.DB_POOL_IDLE as string),
    },
  };
}
