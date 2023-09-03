import { PostgresClient, DB } from './database';
import config from '@config';

let database;
if (config.node_env === 'test') {
  database = new PostgresClient({ ...config.test } as DB);
} else {
  database = new PostgresClient({ ...config.development } as DB);
}

export default database;
