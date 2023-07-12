import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import config from '../src/config';

chai.use(chaiHttp);

describe('Healthcheck Endpoint Testing', function () {
  it('[GET] Server status', async function () {
    const url = config.api_Url || 'http://localhost:8000/v1';
    const res = await chai.request(url).get('/ping');
    expect(res.status).equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').with.lengthOf(5);
    expect(res.body).to.have.property('message').to.equal('Pong!');
  });
});
