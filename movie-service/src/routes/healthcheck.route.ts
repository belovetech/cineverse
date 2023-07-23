import { Router } from 'express';
import IRoute from '@interfaces/route.interface';
import HealthCheckController from '@controllers/healthcheck';

export default class HealthCheckRoute implements IRoute {
  public path = '/ping';
  public router = Router();
  public healthController = new HealthCheckController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.healthController.ping);
  }
}
