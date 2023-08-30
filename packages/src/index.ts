import Logger from './logger';

export * from './exceptions';

export { default as Validator } from './validator';

const logger = new Logger();
export default logger.createLogger();

