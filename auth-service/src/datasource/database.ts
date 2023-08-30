import mongoose, { ConnectOptions, Connection } from "mongoose";
import config from "@config";
import logger from "packages";
import { IConnectionOptionExtend } from "@interfaces/connection.interface";

class MongoClient {
  private connection: Connection;

  constructor(url: string, options?: ConnectOptions) {
    mongoose.connect(url, options);
    this.connection = mongoose.connection;
  }

  public async connect(): Promise<void> {
    this.connection.on("error", () => {
      logger.error("Unable to connect to the database");
      process.exit(1);
    });

    this.connection.once("open", () => {
      logger.info("Database connection has been established successfully");
    });
  }

  public async disconnect(): Promise<void> {
    await this.connection.close();
    logger.info("Database connection has been disconnected.");
  }

  public isAlive(): boolean {
    if (this.connection) {
      return true;
    }
    return false;
  }
}

function getUrl(env: string): string {
  if (env === "test") {
    return config.test.uri;
  }
  return config.development.uri;
}

const options: ConnectOptions & IConnectionOptionExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default new MongoClient(getUrl(config.node_env), options);
