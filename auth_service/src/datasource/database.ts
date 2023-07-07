import * as dotenv from 'dotenv';
import mongoose, { ConnectOptions, Connection } from 'mongoose';
import { IConnectionOptionExtend } from '@interfaces/connection.interface';
import logger from '@/utils/logger';

dotenv.config({ path: __dirname + '/../.env' });

class MongoClient {
  private connection: Connection;

  constructor(url: string, options?: ConnectOptions) {
    mongoose.connect(url, options);
    this.connection = mongoose.connection;
  }

  public async connect(): Promise<void> {
    this.connection.on('error', () => {
      logger.error('Unable to connect to the database');
      process.exit(1);
    });

    this.connection.once('open', () => {
      logger.info('Database connection has been established successfully');
    });
  }

  public async disconnect(): Promise<void> {
    await this.connection.close();
    logger.info('Database connection has been disconnected.');
  }

  public isAlive(): boolean {
    if (this.connection) {
      return true;
    }
    return false;
  }
}

function getUrl(env: string): string {
  if (env === 'testing') {
    return process.env.TEST_DB_URL;
  }
  return process.env.DB_URL;
}

const options: ConnectOptions & IConnectionOptionExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default new MongoClient(getUrl(process.env.NODE_ENV), options);
