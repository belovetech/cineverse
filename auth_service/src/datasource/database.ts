import * as dotenv from 'dotenv';
import mongoose, { ConnectOptions, Connection, connect } from 'mongoose';
import ConnectionOptionExtend from '@interfaces/connection.interface';
import logger from '@libs/logger';

dotenv.config({ path: __dirname + '/../.env' });

const options: ConnectOptions & ConnectionOptionExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class MongoClient {
  private connection: Connection;

  constructor(url: string, options?: ConnectOptions) {
    connect(url, options);
    this.connection = mongoose.connection;
  }

  public async connect() {
    this.connection.on('error', () => {
      logger.error('Unable to connect to the database');
      process.exit(1);
    });

    this.connection.once('open', () => {
      logger.info('Database connection has been established successfully');
    });
  }

  public async disconnect() {
    await this.connection.close();
    logger.info('Database connection has been disconnected.');
  }
}

let url;
if (process.env.NODE_ENV === 'testing') {
  url = process.env.TEST_DB_URL;
} else {
  url = process.env.DB_URL;
}
const dbClient = new MongoClient(url, options);
export default dbClient;
