import Logger from './logger';

export * from './exceptions';
export * from './validator';

export const logger = new Logger().createLogger();
