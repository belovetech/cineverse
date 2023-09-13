import { NextFunction, Request, Response } from 'express';
import { bookingService } from '@services';

export class BookingController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      //TODO: take customerId from token
      // const bookingData = { ...req.body, customerId: req.user.userId };
      const booking = await bookingService.create(req.body);
      return res.status(201).json(booking);
    } catch (error) {
      return next(error);
    }
  }
}
