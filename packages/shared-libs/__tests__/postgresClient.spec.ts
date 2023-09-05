import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import { PostgresClient, DB } from '../src/index';
import { User } from './postgres.setup';

describe.sequential('#postgresClient', () => {
  let db: DB;
  let database: PostgresClient;
  beforeAll(async () => {
    db = {
      database: 'cineverse_test',
      username: 'postgres',
      password: 'Beloved',
    };
    database = new PostgresClient(db, [User]);
    await database.connect();
  });

  describe('#postgresClientInstance', () => {
    it('postgresClient should be defined', () => {
      expect(database.getInstance()).toBeDefined();
    });
  });

  describe('#postgresClientConnect', () => {
    it('should connect to the database', async () => {
      await database.connect();
      expect(database).toBeDefined();
    });
  });

  describe('#createUser', () => {
    it('should create a user', async () => {
      try {
        const user = await User.create({
          name: 'John Doe',
          email: 'test@gmail.com',
        });
        expect(user).toBeDefined();
        expect(user.name).toEqual('John Doe');
        expect(user.email).toEqual('test@gmail.com');
      } catch (error) {
        console.log(error);
      }
    });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
  });
});
