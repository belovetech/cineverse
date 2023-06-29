import chai from 'chai';
import chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Auth-service healthcheck', () => {
  it('should return Pong!', (done: () => void) => {
    chai
      .request('http://localhost:3000')
      .get('/ping')
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').with.lengthOf(5);
        expect(res.body).to.have.property('message').to.equal('Pong!');
        expect(err).to.be.null;
        done();
      });
  });
});
