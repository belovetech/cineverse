import { Router } from 'express';
import { IRoute } from '@interfaces/route';
import { bookingController } from '@controllers';

export class BookingRoute implements IRoute {
  public path = '/bookings';
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, bookingController.create);
  }
}
