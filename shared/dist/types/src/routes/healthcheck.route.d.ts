import IRoute from '@interfaces/route.interface';
export default class HealthCheckRoute implements IRoute {
    path: string;
    router: any;
    private readonly healthController;
    constructor();
    private initializeRoutes;
}
