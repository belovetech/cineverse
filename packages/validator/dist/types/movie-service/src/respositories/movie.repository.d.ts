import { FindOptions } from 'sequelize';
import { MovieDto } from '@dtos/movie.dto';
import { IGetMovie } from '@interfaces/movie.interface';
import Movie from '@models/movies';
export default class MovieRepository {
    createMovie(movieData: MovieDto): Promise<MovieDto>;
    getMovieById(movieId: string, options?: FindOptions): Promise<Movie | null>;
    getMovie(options: FindOptions): Promise<Movie | null>;
    getMovies(reqQuery: Record<string, unknown>): Promise<IGetMovie>;
    updateMovie(movieId: string, options: Partial<Movie>): Promise<Movie>;
    deleteMovie(movieId: string): Promise<Movie | number>;
}
