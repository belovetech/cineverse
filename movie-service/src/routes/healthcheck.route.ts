import { Router } from 'express';
import IRoute from '@interfaces/route.interface';
import { healthcheckController } from '@controllers';

export default class HealthCheckRoute implements IRoute {
  public path = '/ping';
  public router: Router = Router();
  private readonly healthController = healthcheckController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.healthController.ping);
  }
}
