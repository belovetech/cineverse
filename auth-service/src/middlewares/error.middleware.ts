import { Request, Response, NextFunction } from "express";
import { logger, Exception } from "@cineverse/libs";

function errorMiddleware(err: Exception, req: Request, res: Response, next: NextFunction) {
  try {
    const statusCode: number = err.statusCode || 500;
    const message: string = err.message || "Internal Server Error";
    const name: string = err.name || "InternalServerError";

    logger.info(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, message:: ${message}`);

    if (process.env.NODE_ENV === "development") {
      if (err.name === "BadRequestException") {
        const parsedMessage = JSON.parse(message);
        return res.status(statusCode).json({ statusCode, name, ...parsedMessage, stack: err.stack });
      }
      return res.status(statusCode).json({ statusCode, name, message, stack: err.stack });
    }

    if (err.name === "BadRequestException") {
      const parsedMessage = JSON.parse(message);
      return res.status(statusCode).json({ statusCode, name, ...parsedMessage });
    }

    return res.status(statusCode).json({ statusCode, name, error: message });
  } catch (error) {
    return next(error);
  }
}

export default errorMiddleware;
