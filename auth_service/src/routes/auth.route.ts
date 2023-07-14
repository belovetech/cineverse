import { Router } from 'express';
import IRoute from '@interfaces/routes.interface';
import { AuthController } from '@controllers/auth.controller';

export default class AuthRoute implements IRoute {
  public path: string = '/auth';
  public router: Router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.post(`${this.path}/signup`, this.authController.signup);
  }
}
