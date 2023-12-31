import express, { Application } from 'express';
import { logger } from '@cineverse/libs';
import { IRoute } from '@interfaces/route';
import { UnknownEndpoint } from '@controllers/unknown.endpoint';
import config from '@config';
import errorMiddleware from '@middlewares/error.middlewares';
import database from '@datasource/database';
// import swaggerJSDOC from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

export default class App {
  private app: Application;
  private port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = config.port || 5000;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwaggerUi();
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
    await database.connect();
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach((route) => this.app.use('/v1', route.router));
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  //   private initializeSwaggerUi() {
  //     const specs = swaggerJSDOC(swaggerOption);
  //     this.app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));
  //   }

  private async handleUnknownEndpoint() {
    this.app.all('*', UnknownEndpoint.handler);
  }

  private initializeGlobalErrorHandler() {
    this.app.use(errorMiddleware);
  }
}
