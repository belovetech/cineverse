import { seatController } from '@controllers';
import IRoute from '@interfaces/route.interface';
import { Router } from 'express';

export default class SeatRoute implements IRoute {
  public path? = '/seats';
  public router = Router();
  private readonly seatController = seatController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.seatController.createSeat);
    this.router.get(this.path, this.seatController.getSeats);
    this.router.get(`${this.path}/:id`, this.seatController.getSeat);
  }
}
