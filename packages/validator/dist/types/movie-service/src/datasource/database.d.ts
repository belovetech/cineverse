import { Sequelize } from 'sequelize-typescript';
import DB from '@interfaces/db.interface';
declare class PostgresClient {
    private sequelize;
    constructor(db: DB);
    getInstance(): Promise<Sequelize>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    alterDatabase(): Promise<void>;
    dropDatabase(): Promise<void>;
}
export { PostgresClient };
