import express, { Application } from "express";
import logger from "@cineverse/lib";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDOC from "swagger-jsdoc";
import config from "@config";
import customMorgan from "@middlewares/morgan.middleware";
import errorMiddleware from "@middlewares/error.middleware";
import IRoute from "@interfaces/routes.interface";
import mongoClient from "@datasource/database";
import unknownRoute from "@controllers/unknownRoute.controller";
import swaggerOption from "@utils/swaggerOptions";

export default class App {
  private app: Application;
  private port: string | number;
  private env: string;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = config.development.port || 3000;
    this.env = config.node_env;

    void this.inititializeDatabase();
    this.inititializeMiddlewares();
    this.inititializeRoutes(routes);
    this.initializeSwaggerUi();
    this.handleUnknownRoute();
    this.initializeGlobalErrorHandler();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info("==================================");
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info("==================================");
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private async inititializeDatabase(): Promise<void> {
    await mongoClient.connect();
  }

  private inititializeMiddlewares(): void {
    if (this.env === "development") {
      this.app.use(customMorgan());
    }
    this.app.use(morgan("combined"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private inititializeRoutes(routes: IRoute[]): void {
    routes.forEach(route => this.app.use("/v1", route.router));
  }

  private handleUnknownRoute() {
    this.app.all("*", unknownRoute.handler);
  }

  private initializeGlobalErrorHandler(): void {
    this.app.use(errorMiddleware);
  }

  private initializeSwaggerUi(): void {
    const specs = swaggerJSDOC(swaggerOption);
    this.app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(specs));
  }
}
