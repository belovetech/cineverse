import Redis, { RedisOptions, RedisKey, RedisValue } from "ioredis";
import config from "@config";
import logger from "packages";

class RedisClient {
  private redis: Redis;

  constructor(option: RedisOptions) {
    this.redis = new Redis(option);
  }

  public async set(key: RedisKey, value: RedisValue, duration: number): Promise<void> {
    this.redis.set(key, value);
    this.redis.expire(key, duration);
  }

  public async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  public async del(key: string): Promise<void> {
    this.redis.del(key);
  }

  public async connect(): Promise<void> {
    try {
      await this.redis.connect();
      logger.info("Connect to redis server succesfully");
    } catch (error) {
      logger.error("Unable to connect to the redis server: ${error}");
      process.exit(1);
    }
  }

  public disconnect(): void {
    this.redis.disconnect();
    logger.info("Redis server succesfully disconncted");
  }

  public isAlive(): boolean {
    if (this.redis) {
      return true;
    }
    return false;
  }
}

const redisOptions: RedisOptions = {
  host: config.redis.host,
  port: config.redis.port,
};

export default new RedisClient(redisOptions);
