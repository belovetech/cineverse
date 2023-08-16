import { Request, Response, NextFunction } from "express";
export default class HealthCheck {
    ping(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
}
