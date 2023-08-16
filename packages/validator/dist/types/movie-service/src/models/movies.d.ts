import { Model } from 'sequelize-typescript';
import ShowTime from './showtime';
export default class Movie extends Model<Movie> {
    movieId: string;
    title: string;
    genre: string;
    description: string;
    duration: string;
    photo: string;
    showTimes: ShowTime[];
    static setDefaultPhoto(instance: Movie): void;
}
