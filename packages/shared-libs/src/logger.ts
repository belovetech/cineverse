import * as winston from 'winston';

const { combine, timestamp, colorize, printf } = winston.format;

export class Logger {
  private colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };
  private env = process.env.NODE_ENV ?? 'development';
  private isDevelopment = this.env === 'development';

  private logFormat() {
    return combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      colorize({ all: true }),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    );
  }

  private getTransports() {
    return [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: './logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: './logs/combined.log' }),
    ];
  }

  public createLogger() {
    winston.addColors(this.colors);
    return winston.createLogger({
      level: this.isDevelopment ? 'debug' : 'warn',
      format: this.logFormat(),
      transports: this.getTransports(),
    });
  }
}

const logger = new Logger().createLogger();

export { logger };
