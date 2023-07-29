import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import config from '../src/config';
import { PostgresClient } from '../src/datasource/database';

chai.use(chaiHttp);

describe('Movies Endpoint Testing', function () {
  const database = new PostgresClient({ ...config.test });
  let sequelize;

  before(async function () {
    sequelize = await database.getInstance();
    sequelize.options.logging = false;
    await sequelize.sync({ force: true, match: /_test$/ });
  });

  afterEach(async function () {
    await sequelize.close();
  });

  const url = config.api_Url || 'http://localhost:3000/v1';
  it('[POST], create a new movie', async function () {
    const data = {
      title: 'The Murderer',
      genre: 'Action',
      description: 'After a series of deaths in a small provincial town.',
      duration: '120m',
    };

    const res = await chai.request(url).post('/movies').send(data);
    const expectedProperties = ['movieId', 'title', 'genre', 'description', 'duration', 'photo', 'links'];
    expect(res.status).to.equal(201);
    expect(res.body).to.include.keys(...expectedProperties);
    expect(res.body).to.haveOwnProperty('links');
    expect(res.body.links[0]).to.include.keys('rel', 'href', 'action', 'types');
  });
});
