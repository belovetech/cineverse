import express, { Application } from 'express';
import { logger } from '@cineverse/logger';
import config from '@config';
import IRoute from '@interfaces/route.interface';
import database from '@datasource/database';

export default class App {
  private app: Application;
  private port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = config.port || 5000;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info('==================================');
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info('==================================');
    });
  }

  private async initializeDatabase(): Promise<void> {
    await database.connect();
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach(route => this.app.use('/v1', route.router));
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}
