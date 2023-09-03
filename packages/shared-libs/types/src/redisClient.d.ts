import { RedisOptions, RedisKey, RedisValue } from 'ioredis';
export default class RedisClient {
    private redis;
    constructor(option: RedisOptions);
    set(key: RedisKey, value: RedisValue, duration: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    connect(): Promise<void>;
    disconnect(): void;
    isAlive(): boolean;
}
