import { addColors, createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, colorize, printf } = format;

class Logger {
  private levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
  private colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
  };
  private env = process.env.NODE_ENV || "development";
  private isDevelopment = this.env === "development";

  constructor() {
    addColors(this.colors);
  }

  private level() {
    return this.isDevelopment ? "debug" : "warn";
  }

  private logFormat() {
    return combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
      colorize({ all: true }),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    );
  }

  private getTransports() {
    const transport1: DailyRotateFile = new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      auditFile: "logs/app.json",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
    });
    const transport2: DailyRotateFile = new DailyRotateFile({
      level: "http",
      filename: "logs/request-%DATE%.log",
      auditFile: "logs/request.json",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
    });
    const transport3 = new transports.File({
      level: "error",
      filename: "logs/error.log",
    });
    return [new transports.Console(), transport1, transport2, transport3];
  }

  public createLogger() {
    return createLogger({
      level: this.level(),
      levels: this.levels,
      format: this.logFormat(),
      defaultMeta: { service: "auth-service" },
      transports: this.getTransports(),
    });
  }
}

const logger = new Logger().createLogger();
export { logger };
