import { theaterController } from '@controllers';
import IRoute from '@interfaces/route.interface';
import { Router } from 'express';

export default class TheaterRoute implements IRoute {
  public path? = '/theaters';
  public router: Router = Router();
  private readonly theaterController = theaterController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.theaterController.createTheater);
    this.router.get(this.path, this.theaterController.getTheaters);
    this.router.get(`${this.path}/:id`, this.theaterController.getTheater);
  }
}
