import 'dotenv/config';

export const config = {
  development: {
    uri: process.env.TEST_DB_URL,
  },
  db: {
    port: process.env.PORT || 3000,
    uri: process.env.DB_URL,
  },
};
