import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env' });

const config = {
  development: {
    database: process.env.DEV_DB_NAME,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
  },
  test: {
    database: process.env.TEST_DB_NAME,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  node_env: process.env.NODE_ENV || 'development',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3000,
  dialect: process.env.DB_DIALECT,
  baseUrl: process.env.BASE_URL,
  apiUrl: process.env.API_URL,
};

export default config;
