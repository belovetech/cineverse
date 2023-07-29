import express, { Application } from 'express';
import { logger } from '@cineverse/logger';
import config from '@config';
import { PostgresClient } from '@datasource/database';
import errorMiddleware from '@middlewares/error.middleware';
import IRoute from '@interfaces/route.interface';

export default class App {
  private app: Application;
  private port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = config.port || 5000;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeGlobalErrorHandler();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info('==================================');
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info('==================================');
    });
  }

  private async initializeDatabase(): Promise<void> {
    let database;
    if (config.node_env === 'test') {
      database = new PostgresClient({ ...config.test });
    } else {
      database = new PostgresClient({ ...config.development });
    }
    await database.connect();
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach(route => this.app.use('/v1', route.router));
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeGlobalErrorHandler() {
    this.app.use(errorMiddleware);
  }
}
