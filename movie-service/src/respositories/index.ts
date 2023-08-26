import MovieRepository from './movie.repository';
import TheaterRepository from './theater.repository';
import ShowtimeRepository from './showtime.repository';
import SeatRepository from './seat.repository';

export const movieRepository = new MovieRepository();
export const theaterRepository = new TheaterRepository();
export const showtimeRepository = new ShowtimeRepository();
export const seatRepository = new SeatRepository();
