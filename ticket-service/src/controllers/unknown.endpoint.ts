import { Request, Response, NextFunction } from 'express';

export class UnknownEndpoint {
  public static handler(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .status(400)
        .json({ message: `Can't find ${req.originalUrl} on this server.` });
    } catch (error) {
      return next(error);
    }
  }
}
