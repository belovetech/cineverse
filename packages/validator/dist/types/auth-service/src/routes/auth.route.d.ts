import { Router } from "express";
import IRoute from "@interfaces/routes.interface";
export default class AuthRoute implements IRoute {
    path: string;
    router: Router;
    private authController;
    constructor();
    private initializeRouter;
}
