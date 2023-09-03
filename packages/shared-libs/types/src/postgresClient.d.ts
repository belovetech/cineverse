import { Sequelize } from 'sequelize-typescript';
import { DB } from './index';
export default class PostgresClient {
    private sequelize;
    constructor(db: DB, models: any[]);
    getInstance(): Promise<Sequelize>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    alterDatabase(): Promise<void>;
    dropDatabase(): Promise<void>;
}
