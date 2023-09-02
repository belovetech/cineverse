"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresClient = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
class PostgresClient {
    sequelize;
    constructor(db) {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'postgres',
            database: db.database,
            username: db.username,
            password: db.password,
            models: [],
            logging: (msg) => logger.debug(msg),
        });
    }
    async getInstance() {
        try {
            return this.sequelize;
        }
        catch (error) {
            logger.error('Error creating the sequelize instance');
            throw error;
        }
    }
    async connect() {
        try {
            await this.sequelize.authenticate();
            this.alterDatabase();
            logger.info('Connection has been established successfully');
        }
        catch (error) {
            logger.error('Unable to connect to the database: ', error);
            throw error;
        }
    }
    async disconnect() {
        try {
            await this.sequelize.close();
            logger.info('Database has been successfully disconnected');
        }
        catch (error) {
            logger.error('Error disconnecting from the database:', error);
            throw error;
        }
    }
    async alterDatabase() {
        try {
            await this.sequelize.sync({ alter: true, logging: false });
            logger.info('Database has been successfully altered');
        }
        catch (error) {
            logger.error('Error altering the database:', error);
            throw error;
        }
    }
    async dropDatabase() {
        try {
            await this.sequelize.sync({ force: true });
            logger.info('Test database has been successfully dropped');
        }
        catch (error) {
            logger.error('Error dropping the database:', error);
            throw error;
        }
    }
}
exports.PostgresClient = PostgresClient;
