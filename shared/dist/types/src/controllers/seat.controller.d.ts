import { Request, Response, NextFunction } from 'express';
export default class SeatController {
    createSeat(req: Request, res: Response, next: NextFunction): Promise<any>;
    getSeat(req: Request, res: Response, next: NextFunction): Promise<any>;
    getSeats(req: Request, res: Response, next: NextFunction): Promise<any>;
}
