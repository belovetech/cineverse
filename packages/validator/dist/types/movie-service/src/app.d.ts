import IRoute from '@interfaces/route.interface';
export default class App {
    private app;
    private port;
    constructor(routes: IRoute[]);
    listen(): void;
    private initializeDatabase;
    private initializeRoutes;
    private initializeMiddlewares;
    private initializeSwaggerUi;
    private handleUnknownEndpoint;
    private initializeGlobalErrorHandler;
}
