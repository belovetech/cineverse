import { ConnectOptions } from "mongoose";
declare class MongoClient {
    private connection;
    constructor(url: string, options?: ConnectOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isAlive(): boolean;
}
declare const _default: MongoClient;
export default _default;
