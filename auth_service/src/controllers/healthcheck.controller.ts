import { Request, Response, NextFunction } from 'express';
import mongoClient from '../datasource/database';
import redisClient from '../datasource/redis';

export default class HealthCheck {
  public ping(req: Request, res: Response, next: NextFunction) {
    try {
      if (mongoClient.isAlive() && redisClient.isAlive()) {
        return res.status(200).json({ message: 'Pong!' });
      }
      return res.status(500).json({
        message: 'Connection is down!',
        mongoClient: mongoClient.isAlive(),
        redisClient: redisClient.isAlive(),
      });
    } catch (error) {
      return next(error);
    }
  }
}
