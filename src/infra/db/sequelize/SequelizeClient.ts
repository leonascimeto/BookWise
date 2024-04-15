import dotenv from 'dotenv';
import { Dialect, Options, Sequelize } from 'sequelize';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

export class SequelizeClient {
  private static instance: Sequelize;

  static getInstance(): Sequelize {
    if (!SequelizeClient.instance) {
      const options: Options = NODE_ENV === 'production' ? this.prodConfig : this.devConfig;

      SequelizeClient.instance = new Sequelize(options);
    }

    return SequelizeClient.instance;
  }

  private static devConfig: Options = {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
    sync: { force: true },
  };

  private static prodConfig: Options = {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    ssl: process.env.DB_SSL === 'true',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.DB_LOGGING === 'true',
    sync: { force: process.env.DB_SYNC_FORCE === 'true' },
    pool: {
      max: parseInt(process.env.DB_POOL_MAX as string),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE as string),
      idle: parseInt(process.env.DB_POOL_IDLE as string),
    },
  };
}
