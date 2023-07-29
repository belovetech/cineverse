import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import config from '../src/config';

chai.use(chaiHttp);

describe('HealthCheck of the movie-service server', function () {
  it('[GET] should return pong', async function () {
    const url = config.api_Url || 'http://localhost:3000/v1';
    const res = await chai.request(url).get('/ping');
    expect(res.status).to.equal(200);
    expect(res.body).haveOwnProperty('message', 'Pong');
  });
});
