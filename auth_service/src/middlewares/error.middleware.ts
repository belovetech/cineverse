import { Request, Response, NextFunction } from 'express';
import { Exception } from '@/exceptions/exception';
import logger from '@/utils/logger';

function errorMiddleware(err: Exception, req: Request, res: Response, next: NextFunction) {
  try {
    const statusCode: number = err.statusCode || 500;
    const message: string = err.message || 'Internal Server Error';

    logger.info(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, message:: ${message}`);
    return res.status(statusCode).json({ message });
  } catch (error) {
    return next(error);
  }
}

export default errorMiddleware;
