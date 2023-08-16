import { Request, Response, NextFunction } from 'express';
export default class TheaterController {
    createTheater(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getTheater(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getTheaters(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
