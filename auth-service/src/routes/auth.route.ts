import { Router } from "express";
import { IRoute, IPathsArray } from "@interfaces";
import { AuthController } from "@controllers";
import { authMiddleware, loginThrottleMiddleware } from "@middlewares";

export default class AuthRoute implements IRoute {
  public path: string = "/auth";
  public router: Router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.post(`${this.path}/signup`, this.authController.signup);
    this.router.post(`${this.path}/signin`, loginThrottleMiddleware, this.authController.login);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logout);
    this.router.post(`${this.path}/verify-otp`, this.authController.verifyOtp);
    this.router.post(`${this.path}/send-otp`, this.authController.sendOtp);
  }

  public getPaths(): IPathsArray {
    const pathsArray: IPathsArray = [
      {
        method: "POST",
        path: `${this.path}/signup`,
      },
      {
        method: "POST",
        path: `${this.path}/signin`,
      },
      {
        method: "POST",
        path: `${this.path}/logout`,
      },
      {
        method: "POST",
        path: `${this.path}/send-otp`,
      },
      {
        method: "POST",
        path: `${this.path}/verify-otp`,
      },
    ];
    return pathsArray;
  }
}
