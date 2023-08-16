import IRoute from "@interfaces/routes.interface";
export default class HealthCheckRoute implements IRoute {
    path?: string;
    router: import("express-serve-static-core").Router;
    healthcheck: any;
    constructor();
    private initializeRoutes;
}
