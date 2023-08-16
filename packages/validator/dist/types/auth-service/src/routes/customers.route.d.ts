import IRoute from "@interfaces/routes.interface";
export default class CustomerRoute implements IRoute {
    path: string;
    router: import("express-serve-static-core").Router;
    customerController: any;
    constructor();
    private initializeRoute;
}
