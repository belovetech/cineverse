import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDOC from 'swagger-jsdoc';
import config from '@config';
import swaggerOption from '@utils/swagger';
import errorMiddleware from '@middlewares/error.middleware';
import IRoute from '@interfaces/route.interface';
import { logger } from '@cineverse/logger';
import { PostgresClient } from '@datasource/database';
import UnknownEndpoint from '@controllers/unknownendpoint';

export default class App {
  private app: Application;
  private port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = config.port || 5000;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwaggerUi();
    this.handleUnknownEndpoint();
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

  private initializeSwaggerUi() {
    const specs = swaggerJSDOC(swaggerOption);
    this.app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private async handleUnknownEndpoint() {
    this.app.all('*', UnknownEndpoint.handler);
  }

  private initializeGlobalErrorHandler() {
    this.app.use(errorMiddleware);
  }
}
