import { addColors, createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, colorize, printf } = format;

class Logger {
  private colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };
  private env = process.env.NODE_ENV || 'development';
  private isDevelopment = this.env === 'development';

  private logFormat() {
    return combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      colorize({ all: true }),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    );
  }

  private getTransports() {
    const commonTransporOptions = {
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '50m',
      maxFiles: '1d',
    };
    const transport1: DailyRotateFile = new DailyRotateFile({
      level: 'info',
      filename: 'logs/app-%DATE%.log',
      auditFile: 'logs/app.json',
      ...commonTransporOptions,
    });

    const transport2: DailyRotateFile = new DailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      auditFile: 'logs/error.json',
      ...commonTransporOptions,
    });

    const transport3: DailyRotateFile = new DailyRotateFile({
      filename: 'logs/other-%DATE%.log',
      auditFile: 'logs/other.json',
      ...commonTransporOptions,
    });

    return [new transports.Console(), transport1, transport2, transport3];
  }

  public createLogger() {
    addColors(this.colors);
    return createLogger({
      level: this.isDevelopment ? 'debug' : 'warn',
      format: this.logFormat(),
      transports: this.getTransports(),
    });
  }
}

const logger = new Logger().createLogger();
export { logger };
