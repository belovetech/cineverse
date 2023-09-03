import { Sequelize } from 'sequelize-typescript';
export interface DB {
    database: string;
    username: string;
    password: string;
}
export declare class PostgresClient {
    private sequelize;
    constructor(db: DB, models: any[]);
    getInstance(): Promise<Sequelize>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    alterDatabase(): Promise<void>;
    dropDatabase(): Promise<void>;
}
