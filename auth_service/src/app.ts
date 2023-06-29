import 'dotenv/config';
import express from 'express';
import IRoute from '@interfaces/routes.interface';
import logger from '@libs/logger';
import morgan from 'morgan';
import customMorgan from '@middlewares/morgan.middleware';
import dbClient from '@datasource/database';

export default class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.env = process.env.NODE_ENV || 'development';

    this.inititializeDatabase();
    this.inititializeMiddlewares();
    this.inititializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info('==================================');
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info('==================================');
    });
  }

  private inititializeRoutes(routes: IRoute[]) {
    routes.forEach(route => this.app.use('/', route.router));
  }

  private inititializeMiddlewares() {
    if (this.env === 'development') {
      this.app.use(customMorgan());
    } else {
      this.app.use(morgan('combined'));
    }
  }

  private async inititializeDatabase() {
    await dbClient.connect();
  }
}
