import { PostgresClient } from './database';
import config from '@config';

let database;
if (config.node_env === 'test') {
  database = new PostgresClient({ ...config.test });
} else {
  database = new PostgresClient({ ...config.development });
}

export default database;
