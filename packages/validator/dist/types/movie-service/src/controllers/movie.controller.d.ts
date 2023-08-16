import { Request, Response, NextFunction } from 'express';
export default class MovieController {
    createMovie(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getMovies(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getMovie(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
