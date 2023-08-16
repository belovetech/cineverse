import { Request, Response, NextFunction } from "express";
export default class UnknownRoute {
    static handler(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
}
