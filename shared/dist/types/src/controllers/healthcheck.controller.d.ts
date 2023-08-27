import { Request, Response, NextFunction } from 'express';
export default class HealthCheckController {
    ping(req: Request, res: Response, next: NextFunction): Promise<any>;
}
