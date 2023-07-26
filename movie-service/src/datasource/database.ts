import { Sequelize } from 'sequelize-typescript';
import { logger } from '@cineverse/logger';
import config from '@config';
import DB from '@interfaces/db.interface';
import Movie from '@models/movies';
import Seat from '@models/seat';
import ShowTime from '@models/showtime';
import Theater from '@models/theater';
import TheaterSeat from '@models/theaterSeat';

class PostgresClient {
  private sequelize: Sequelize;

  constructor(db: DB) {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      database: db.database,
      username: db.username,
      password: db.password,
      models: [Movie, Theater, Seat, TheaterSeat, ShowTime],
      logging: msg => logger.debug(msg),
    });
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.sync({ alter: true });
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
      await this.sequelize.sync({ force: true, match: /_test$/ });
      logger.info('Test database has been successfully dropped');
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
  let db: DB;
  if (process.env.NODE_ENV === 'test') {
    db = { ...config.test };
  } else {
    db = { ...config.development };
  }

  return db;
}

const database = new PostgresClient(setUpDatabase());
export default database;
