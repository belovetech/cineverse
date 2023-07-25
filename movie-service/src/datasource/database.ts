import { Options, Sequelize } from 'sequelize';
import config from '@config';
import logger from '@cineverse/logger';
import DB from '@interfaces/db.interface';

class PostgresClient {
  private sequelize: Sequelize;

  constructor(db: DB, options?: Options) {
    options.host = config.host;
    options.dialect = 'postgres';
    options.logging = msg => logger.debug(msg);
    this.sequelize = new Sequelize(db.database, db.username, db.password);
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      logger.info('Connection has been established successfully');
    } catch (error) {
      logger.error('Unable to connect to the database: ', error);
    }
  }

  public async disconnect(): Promise<void> {
    await this.sequelize.close();
    logger.info('Database has been successfully disconnected');
  }

  public async dropDatabase(): Promise<void> {
    await this.sequelize.sync({ force: true });
    logger.info('Database has been successfully dropped');
  }

  public async alterDatabase(): Promise<void> {
    await this.sequelize.sync({ alter: true });
    logger.info('Database has been successfully altered');
  }
}

function setUpDatabase() {
  let database: DB;
  if (process.env.NODE_ENV === 'test') {
    database.database = config.test.db_name;
    database.username = config.test.db_username;
    database.password = config.test.db_password;
  } else {
    database.database = config.development.db_name;
    database.username = config.development.db_username;
    database.password = config.development.db_password;
  }
  return database;
}

const database = new PostgresClient(setUpDatabase());
export default database;
