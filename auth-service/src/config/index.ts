import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });

const config = {
  node_env: process.env.NODE_ENV || 'development',
  development: {
    uri: process.env.DEV_DB_URL,
    port: process.env.DB_PORT || 8000,
  },
  test: {
    uri: process.env.TEST_DB_URL,
    port: process.env.DB_PORT || 5000,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  baseUrl: process.env.BASE_URL,
  api_Url: process.env.API_URL,
  secret: process.env.SECRET,
};

export default config;
