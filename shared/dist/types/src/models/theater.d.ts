import { Model } from 'sequelize-typescript';
import Seat from './seat';
import ShowTime from './showtime';
export default class Theater extends Model<Theater> {
    theaterId: string;
    name: string;
    location: string;
    seatingCapacity: number;
    showTimes: ShowTime[];
    seats: Seat[];
}
