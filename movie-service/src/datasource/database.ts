import { Options, Sequelize } from 'sequelize';
import config from '@config';
import logger from '@cineverse/logger';
import DB from '@interfaces/db.interface';

class PostgresClient {
  private sequelize: Sequelize;

  constructor(db: DB, options?: Options) {
    options = options || {};
    options.host = config.host;
    options.dialect = 'postgres';
    options.logging = msg => logger.debug(msg);
    this.sequelize = new Sequelize(db.database, db.username, db.password, { ...options });
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      logger.info('Connection has been established successfully');
    } catch (error) {
      logger.error('Unable to connect to the database: ', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      logger.info('Database has been successfully disconnected');
    } catch (error) {
      logger.error('Error disconnecting from the database:', error);
      throw error;
    }
  }

  public async dropDatabase(): Promise<void> {
    try {
      await this.sequelize.sync({ force: true });
      logger.info('Database has been successfully dropped');
    } catch (error) {
      logger.error('Error dropping the database:', error);
      throw error;
    }
  }

  public async alterDatabase(): Promise<void> {
    try {
      await this.sequelize.sync({ alter: true });
      logger.info('Database has been successfully altered');
    } catch (error) {
      logger.error('Error altering the database:', error);
      throw error;
    }
  }

  public getInstance() {
    try {
      return this.sequelize;
    } catch (error) {
      logger.error('Error creating the sequelize instance');
      throw error;
    }
  }
}

function setUpDatabase() {
  let db: DB = {} as DB;
  if (process.env.NODE_ENV === 'test') {
    db.database = config.test.db_name;
    db.username = config.test.db_username;
    db.password = config.test.db_password;
  } else {
    console.log(config.development.db_name);
    db.database = config.development.db_name;
    db.username = config.development.db_username;
    db.password = config.development.db_password;
  }

  return db;
}

const database = new PostgresClient(setUpDatabase());
export default database;
