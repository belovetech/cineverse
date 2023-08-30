import logger from "libs";
import morgan, { StreamOptions } from "morgan";

export default function customMorgan() {
  const stream: StreamOptions = {
    write: message => logger.http(message),
  };
  const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
  };
  const format = ":method :url :status :res[content-length] - :response-time ms";
  return morgan(format, { stream, skip });
}
