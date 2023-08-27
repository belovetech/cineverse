import { Request, Response, NextFunction } from 'express';
export default class MovieController {
    createMovie(req: Request, res: Response, next: NextFunction): Promise<any>;
    getMovies(req: Request, res: Response, next: NextFunction): Promise<any>;
    getMovie(req: Request, res: Response, next: NextFunction): Promise<any>;
}
