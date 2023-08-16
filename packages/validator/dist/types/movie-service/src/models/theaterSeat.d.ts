import { Model } from 'sequelize-typescript';
export default class TheaterSeat extends Model {
    theaterId: string;
    seatId: string;
}
