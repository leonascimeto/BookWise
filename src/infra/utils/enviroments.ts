import dotenv from 'dotenv';

export const NODE_ENV = process.env.NODE_ENV;
dotenv.config({ path: NODE_ENV === 'production' ? '.env' : `.env.${NODE_ENV}` });

export const DB_DIALECT = process.env.DB_DIALECT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_SSL = process.env.DB_SSL;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_LOGGING = process.env.DB_LOGGING;
export const DB_SYNC_FORCE = process.env.DB_SYNC_FORCE;
export const DB_POOL_MAX = process.env.DB_POOL_MAX;
export const DB_POOL_ACQUIRE = process.env.DB_POOL_ACQUIRE;
export const DB_POOL_IDLE = process.env.DB_POOL_IDLE;
