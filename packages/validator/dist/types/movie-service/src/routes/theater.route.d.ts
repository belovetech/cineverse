import IRoute from '@interfaces/route.interface';
export default class TheaterRoute implements IRoute {
    path?: string;
    router: import("express-serve-static-core").Router;
    private readonly theaterController;
    constructor();
    private initializeRoutes;
}
