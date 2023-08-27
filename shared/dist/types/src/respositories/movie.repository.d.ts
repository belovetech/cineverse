import { FindOptions } from 'sequelize';
import { MovieDto } from '@dtos/movie.dto';
import { Metadata } from '@interfaces/pagination.interface';
import Movie from '@models/movies';
export default class MovieRepository {
    create(movieData: MovieDto): Promise<Movie>;
    findByPk(movieId: string, options?: unknown): Promise<Movie | null>;
    findOne(options: FindOptions): Promise<Movie | null>;
    findAll(reqQuery: Record<string, string>): Promise<{
        movies: Movie[];
        metadata: Metadata;
    }>;
    update(movieId: string, options: Partial<Movie>): Promise<Movie>;
    delete(movieId: string): Promise<Movie | number>;
    findMovieWithAssociates(movieId: string): Promise<Movie | null>;
}
