import Logger from './logger';

export * from './exceptions';

export { default as Validator } from './validator';

export const logger = new Logger().createLogger();
