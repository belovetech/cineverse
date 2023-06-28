import { addColors, createLogger, transports, format } from 'winston';

const { combine, timestamp, colorize, printf } = format;

class Logger {
  private levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
  private colors = { error: 'red', warn: 'yellow', info: 'green', http: 'magenta', debug: 'white' };
  private env = process.env.NODE_ENV || 'development';
  private isDevelopment = this.env == 'development';

  constructor() {
    addColors(this.colors);
  }

  private level() {
    return this.isDevelopment ? 'debug' : 'warn';
  }

  private format() {
    return combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      colorize({ all: true }),
      printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    );
  }

  private transports() {
    return [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/all.log' }),
    ];
  }

  public createLogger() {
    return createLogger({
      level: this.level(),
      levels: this.levels,
      format: this.format(),
      defaultMeta: { service: 'auth-service' },
      transports: this.transports(),
    });
  }
}

const logger: Logger = new Logger();
export default logger.createLogger();
