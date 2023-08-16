import { Model } from 'sequelize-typescript';
import Theater from './theater';
export default class Seat extends Model<Seat> {
    seatId: string;
    seatNumber: number;
    availableStatus: string;
    theaters: Theater[];
}
