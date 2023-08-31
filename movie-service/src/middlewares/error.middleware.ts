import { Request, Response, NextFunction } from 'express';
import { logger, Exception } from '@cineverse/libs';

const errorMiddleware = (err: Exception, req: Request, res: Response, next: NextFunction) => {
  try {
    const statusCode: number = err.statusCode || 500;
    const message: string = err.message || 'Internal Server Error';
    const name: string = err.name || 'InternalServerError';

    logger.info(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, message:: ${message}`);

    if (err.name === 'BadRequestException') {
      const parsedMessage = JSON.parse(message);
      return res.status(statusCode).json({ statusCode, name, ...parsedMessage });
    }
    return res.status(statusCode).json({ statusCode, name, error: message });
  } catch (error) {
    return next(error);
  }
};

export default errorMiddleware;
