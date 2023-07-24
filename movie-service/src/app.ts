import express, { Application } from 'express';
import config from '@config';
import IRoute from '@interfaces/route.interface';
import { logger } from '@cineverse/logger';

export default class App {
  private app: Application;
  private port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = config.development.port || 5000;

    this.initializeRoutes(routes);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info('==================================');
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info('==================================');
    });
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach(route => this.app.use('/v1', route.router));
  }
}
