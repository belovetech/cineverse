import { MovieDto } from '@dtos/movie.dto';
import IMovie, { IGetMovie } from '@interfaces/movie.interface';
export default class MovieService {
    static createMovie(movieData: MovieDto): Promise<MovieDto>;
    static getMovies(reqQuery: Record<string, unknown>): Promise<IGetMovie>;
    static getMovie(movieId: string): Promise<IMovie>;
}
