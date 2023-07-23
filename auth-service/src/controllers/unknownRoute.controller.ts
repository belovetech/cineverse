import { Request, Response, NextFunction } from 'express';

export default class UnknownRoute {
  public static handler(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(400).json({ message: `Can't find ${req.originalUrl} on this server.` });
    } catch (error) {
      return next(error);
    }
  }
}
