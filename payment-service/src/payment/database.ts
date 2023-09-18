import { config } from './index';
import { PostgresClient, DB } from '@cineverse/libs';
import { Payment } from './payment.model';

let database: PostgresClient;
const models = [Payment];
if (config.node_env === 'test') {
  database = new PostgresClient(config.test as DB, models);
} else {
  database = new PostgresClient(config.development as DB, models);
}

export default database;
