import { showtimeController } from '@controllers';
import IRoute from '@interfaces/route.interface';
import { Router } from 'express';

export default class ShowtimeRoute implements IRoute {
  public path? = '/showtimes';
  public router = Router();
  private readonly showtimeController = showtimeController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.showtimeController.createshowtime);
    this.router.get(this.path, this.showtimeController.getShowtimes);
    this.router.get(`${this.path}/:id`, this.showtimeController.getshowtime);
  }
}
