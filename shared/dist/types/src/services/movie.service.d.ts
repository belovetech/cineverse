import { MovieDto } from '@dtos/movie.dto';
import { Metadata } from '@interfaces/pagination.interface';
import Movie from '@models/movies';
export default class MovieService {
    createMovie(movieData: MovieDto): Promise<Movie>;
    getMovies(reqQuery: Record<string, unknown>): Promise<{
        movies: Movie[];
        metadata: Metadata;
    }>;
    getMovie(movieId: string): Promise<Movie | null>;
}
