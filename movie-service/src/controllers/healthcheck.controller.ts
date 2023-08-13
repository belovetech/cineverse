import { Request, Response, NextFunction } from 'express';

export default class HealthCheckController {
  public async ping(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: 'Pong' });
    } catch (error) {
      return next(error);
    }
  }
}
