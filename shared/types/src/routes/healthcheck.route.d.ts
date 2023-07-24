import IRoute from '@interfaces/route.interface';
import HealthCheckController from '@controllers/healthcheck';
export default class HealthCheckRoute implements IRoute {
    path: string;
    router: import("express-serve-static-core").Router;
    healthController: HealthCheckController;
    constructor();
    private initializeRoutes;
}
