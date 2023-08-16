import { Request, Response, NextFunction } from 'express';
declare const errorMiddleware: (err: Exception, req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export default errorMiddleware;
