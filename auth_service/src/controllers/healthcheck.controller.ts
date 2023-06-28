import { Request, Response, NextFunction } from 'express';

export default class HealthCheck {
  public async ping(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: 'Pong!' });
    } catch (error) {
      next(error);
      return res.status(500).json({ error: error.message });
    }
  }
}
