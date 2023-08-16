"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresClient = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const logger_1 = require("@cineverse/logger");
const movies_1 = __importDefault(require("@models/movies"));
const seat_1 = __importDefault(require("@models/seat"));
const showtime_1 = __importDefault(require("@models/showtime"));
const theater_1 = __importDefault(require("@models/theater"));
const theaterSeat_1 = __importDefault(require("@models/theaterSeat"));
class PostgresClient {
    constructor(db) {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'postgres',
            database: db.database,
            username: db.username,
            password: db.password,
            models: [movies_1.default, theater_1.default, seat_1.default, theaterSeat_1.default, showtime_1.default],
            logging: msg => logger_1.logger.debug(msg),
        });
    }
    getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sequelize;
            }
            catch (error) {
                logger_1.logger.error('Error creating the sequelize instance');
                throw error;
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                logger_1.logger.info('Connection has been established successfully');
            }
            catch (error) {
                logger_1.logger.error('Unable to connect to the database: ', error);
                throw error;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.close();
                logger_1.logger.info('Database has been successfully disconnected');
            }
            catch (error) {
                logger_1.logger.error('Error disconnecting from the database:', error);
                throw error;
            }
        });
    }
    alterDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.sync({ alter: true });
                logger_1.logger.info('Database has been successfully altered');
            }
            catch (error) {
                logger_1.logger.error('Error altering the database:', error);
                throw error;
            }
        });
    }
    dropDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.sync({ force: true });
                logger_1.logger.info('Test database has been successfully dropped');
            }
            catch (error) {
                logger_1.logger.error('Error dropping the database:', error);
                throw error;
            }
        });
    }
}
exports.PostgresClient = PostgresClient;
//# sourceMappingURL=database.js.map