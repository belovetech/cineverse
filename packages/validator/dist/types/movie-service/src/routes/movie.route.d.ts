import IRoute from '@interfaces/route.interface';
export default class MovieRoute implements IRoute {
    path?: string;
    router: import("express-serve-static-core").Router;
    private readonly movieController;
    constructor();
    private initializeRoutes;
}
