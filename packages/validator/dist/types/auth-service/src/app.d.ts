import { Application } from "express";
import IRoute from "@interfaces/routes.interface";
export default class App {
    private app;
    private port;
    private env;
    constructor(routes: IRoute[]);
    listen(): void;
    getServer(): Application;
    private inititializeDatabase;
    private inititializeMiddlewares;
    private inititializeRoutes;
    private handleUnknownRoute;
    private initializeGlobalErrorHandler;
    private initializeSwaggerUi;
}
