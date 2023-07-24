import IRoute from '@interfaces/route.interface';
export default class App {
    private app;
    private port;
    constructor(routes: IRoute[]);
    listen(): void;
    private initializeRoutes;
}
