import { Request, Response, NextFunction } from 'express';
export default class ShowtimeController {
    createshowtime(req: Request, res: Response, next: NextFunction): Promise<any>;
    getshowtime(req: Request, res: Response, next: NextFunction): Promise<any>;
    getShowtimes(req: Request, res: Response, next: NextFunction): Promise<any>;
}
