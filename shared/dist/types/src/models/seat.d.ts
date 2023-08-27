import { Model } from 'sequelize-typescript';
export declare enum Status {
    AVAILABLE = "available",
    BOOKED = "booked",
    CANCELLED = "cancelled"
}
export default class Seat extends Model<Seat> {
    seatId: string;
    seatNumber: string;
    rowNumber: string;
    status: string;
    theaterId: string;
}
