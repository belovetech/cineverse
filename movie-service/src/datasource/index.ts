import { PostgresClient } from './database';
import config from '@config';

let database;
if (config.node_env === 'test') {
  database = new PostgresClient({ ...config.test });
} else {
  database = new PostgresClient({ ...config.development });
}

export default database;

// import config from '@config';
// import { PostgresClient, DB } from '@cineverse/libs';
// import { Movie, Theater, ShowTime, Seat } from '@models';

// let database;
// const models = [Movie, Theater, Seat, ShowTime];
// if (config.node_env === 'test') {
//   database = new PostgresClient(config.test as DB, models);
// } else {
//   database = new PostgresClient(config.development as DB, models);
// }

// export default database;
