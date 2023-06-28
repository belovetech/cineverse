import express from 'express';
import IRoute from './interfaces/routes.interface';
import logger from './lib/logger';

export default class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.env = process.env.NODE_ENV || 'development';

    this.inititializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.debug(`App listening on localhost:${this.port}`);
    });
  }

  private inititializeRoutes(routes: IRoute[]) {
    routes.forEach(route => this.app.use('/', route.router));
  }
}
