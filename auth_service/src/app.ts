import 'dotenv/config';
import express, { Application } from 'express';
import morgan from 'morgan';
import customMorgan from '@middlewares/morgan.middleware';
import errorMiddleware from './middlewares/error.middleware';
import IRoute from '@interfaces/routes.interface';
import logger from '@/utils/logger';
import mongoClient from '@/datasource/database';
import { UnknownRoute } from './controllers/unknownRoute.controller';

export default class App {
  private app: Application;
  private port: string | number;
  private env: string;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.env = process.env.NODE_ENV || 'development';

    this.inititializeDatabase();
    this.inititializeMiddlewares();
    this.inititializeRoutes(routes);
    this.handleUnknownRoute();
    this.initializeGlobalErrorHandler();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info('==================================');
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info('==================================');
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private inititializeRoutes(routes: IRoute[]): void {
    routes.forEach(route => this.app.use('/', route.router));
  }

  private inititializeMiddlewares(): void {
    if (this.env === 'development') {
      this.app.use(customMorgan());
    }
    this.app.use(morgan('combined'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async inititializeDatabase(): Promise<void> {
    await mongoClient.connect();
  }

  private initializeGlobalErrorHandler(): void {
    this.app.use(errorMiddleware);
  }

  private handleUnknownRoute() {
    this.app.all('*', UnknownRoute.handler);
  }
}
