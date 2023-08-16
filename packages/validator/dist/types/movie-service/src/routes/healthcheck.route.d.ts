import IRoute from '@interfaces/route.interface';
export default class HealthCheckRoute implements IRoute {
    path: string;
    router: import("express-serve-static-core").Router;
    private readonly healthController;
    constructor();
    private initializeRoutes;
}
