import { Model } from 'sequelize-typescript';
import Movie from './movies';
import Theater from './theater';
export default class ShowTime extends Model<ShowTime> {
    showTimeId: string;
    startTime: string;
    endTime: string;
    date: string;
    movieId: string;
    movie: Movie;
    theaterId: string;
    theater: Theater;
}
