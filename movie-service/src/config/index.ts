import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env' });

const config = {
  development: {
    node_env: 'development',
    db_name: process.env.DEV_DB_NAME,
    db_username: process.env.DEV_DB_USERNAME,
    db_password: process.env.DEV_DB_PASSWORD,
  },
  test: {
    node_env: 'test',
    db_name: process.env.TEST_DB_NAME,
    db_username: process.env.TEST_DB_USERNAME,
    db_password: process.env.TEST_DB_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3000,
  dialect: process.env.DB_DIALECT,
  baseUrl: process.env.BASE_URL,
  api_Url: process.env.API_URL,
};

export default config;
