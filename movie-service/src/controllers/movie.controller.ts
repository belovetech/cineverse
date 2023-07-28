import { MovieDto } from '@dtos/movie.dto';
import MovieService from '@services/movie.service';
import { Request, Response, NextFunction } from 'express';

export default class MovieController {
  public async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movieData: MovieDto = req.body;
      const movie = MovieService.createMovie(movieData);
      return res.status(201).json(movie);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
