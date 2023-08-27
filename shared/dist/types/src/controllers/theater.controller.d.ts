import { Request, Response, NextFunction } from 'express';
export default class TheaterController {
    createTheater(req: Request, res: Response, next: NextFunction): Promise<any>;
    getTheater(req: Request, res: Response, next: NextFunction): Promise<any>;
    getTheaters(req: Request, res: Response, next: NextFunction): Promise<any>;
}
