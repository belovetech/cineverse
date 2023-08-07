import { Router } from "express";
import IRoute from "@interfaces/routes.interface";
import { AuthController } from "@controllers/auth.controller";
import { authMiddleware } from "@middlewares/auth.middleware";
import { loginThrottleMiddleware } from "@middlewares/loginThrottle.middleware";

export default class AuthRoute implements IRoute {
  public path: string = "/auth";
  public router: Router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.post(`${this.path}/signup`, this.authController.signup);
    this.router.post(`${this.path}/login`, loginThrottleMiddleware, this.authController.login);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logout);
    this.router.post(`${this.path}/verify`, this.authController.verifyOtp);
    this.router.post(`${this.path}/otp`, this.authController.sendOtp);
  }
}
