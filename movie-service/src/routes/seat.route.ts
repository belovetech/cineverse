import { seatController } from '@controllers';
import IRoute from '@interfaces/route.interface';
import { Router } from 'express';

export default class SeatRoute implements IRoute {
  public path? = '/seats';
  public router: Router = Router();
  private readonly seatController = seatController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.seatController.createSeat);
    this.router.get(this.path, this.seatController.getSeats);
    this.router.get(`${this.path}/:id`, this.seatController.getSeat);
    this.router.patch(`${this.path}/:id`, this.seatController.updateSeat);
  }
}
