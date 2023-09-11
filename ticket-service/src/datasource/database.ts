import config from '@config';
import { PostgresClient, DB } from '@cineverse/libs';
import { Booking, Ticket } from '@models';

let database;
const models = [Booking, Ticket];
if (config.node_env === 'test') {
  database = new PostgresClient(config.test as DB, models);
} else {
  database = new PostgresClient(config.development as DB, models);
}

export default database;
