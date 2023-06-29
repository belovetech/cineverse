import { Router } from 'express';
import HealthCheck from '@controllers/healthcheck.controller';
import IRoute from '@interfaces/routes.interface';

export default class HealthCheckRoute implements IRoute {
  public path? = '/ping';
  public router = Router();
  public healthcheck = new HealthCheck();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.healthcheck.ping);
  }
}
