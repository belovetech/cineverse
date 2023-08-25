import MovieRepository from './movie.repository';
import TheaterRepository from './theater.repository';
import ShowtimeRepository from './showtime.repository';

export const movieRepository = new MovieRepository();
export const theaterRepository = new TheaterRepository();
export const showtimeRepository = new ShowtimeRepository();
