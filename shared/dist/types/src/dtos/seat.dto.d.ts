export declare enum Status {
    AVAILABLE = "available",
    BOOKED = "booked",
    CANCELLED = "cancelled"
}
export declare class SeatDto {
    readonly seatId: string;
    readonly seatNumber: string;
    readonly rowNumber: string;
    readonly status: Status;
    readonly theaterId: string;
}
