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

  public async getMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const { movies, metadata } = await MovieService.getMovies(req.query);
      const moviesData = movies.map(movie => new ApiResponseFormatter<MovieDto>(movie).format());
      return res.status(200).json({ metadata, data: moviesData });
    } catch (error) {
      logger.error(`Get Movies Error: ${error}`);
      return next(error);
    }
  }

  public async getMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = (await MovieService.getMovie(req.params?.id)) as MovieDto;
      const response = new ApiResponseFormatter<MovieDto>(movie, movieLinks.get);
      return res.status(200).json(response.format());
    } catch (error) {
      logger.error(`Get Movie Error: ${error}`);
      return next(error);
    }
  }
}
