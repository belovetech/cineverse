import MovieService from './movie.service';
import TheaterService from './theater.service';
import ShowtimeService from './showtime.service';

export const movieService = new MovieService();
export const theaterService = new TheaterService();
export const showtimeService = new ShowtimeService();
