import config from '@config';
import { PostgresClient, DB } from '@cineverse/libs';
import { Booking, Ticket, Payment } from '@models';

let database;
const models = [Booking, Ticket, Payment];
if (config.node_env === 'test') {
  database = new PostgresClient(config.test as DB, models);
} else {
  database = new PostgresClient(config.development as DB, models);
}

export default database;
