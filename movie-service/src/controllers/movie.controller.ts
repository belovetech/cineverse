import { Request, Response, NextFunction } from 'express';
import { MovieDto } from '@dtos/movie.dto';
import { logger } from '@cineverse/logger';
import { movieLinks } from '@utils/links';
import ApiResponseFormatter from '@utils/formatter';
import MovieService from '@services/movie.service';

export default class MovieController {
  public async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movieData: MovieDto = req.body;
      const movie = await MovieService.createMovie(movieData);
      const response = new ApiResponseFormatter<MovieDto>(movie, movieLinks.post);
      return res.status(201).json(response.format());
    } catch (error) {
      logger.error(`Create Movie Error: ${error}`);
      return next(error);
    }
  }
}
