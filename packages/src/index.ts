import Logger from './logger';

export * from './exceptions';
export * from './validator';

const logger = new Logger();
export default logger.createLogger();
