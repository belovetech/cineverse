import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import config from '../src/config/index';
import MongoClient from '../src/datasource/database';
import Customer from '../src/models/customers.model';

chai.use(chaiHttp);

describe('Authentication Endpoints', function () {
  before(async function () {
    this.timeout(5000);
    await MongoClient.connect();
    await Customer.deleteMany({});
  });

  after(async function () {
    await MongoClient.disconnect();
  });

  const data = {
    firstName: 'keith',
    lastName: 'Jane',
    email: 'keithj@gmail.com',
    password: 'p@ssw0rd',
    passwordConfirm: 'p@ssw0rd',
  };
  const url = config.api_Url;

  describe('[POST] authentication endpoint', function () {
    it('Signup new user', async function () {
      const res = await chai.request(url).post('/auth/signup').send(data);
      expect(res.status).to.equal(201);
      expect(res.body).to.haveOwnProperty('firstName', data.firstName);
      expect(res.body).to.haveOwnProperty('lastName', data.lastName);
      expect(res.body).to.haveOwnProperty('email', data.email);
      expect(res.body).to.haveOwnProperty('isVerified', false);
      expect(res.body).to.haveOwnProperty('links');
      expect(res.body.links).to.be.an('array');
      expect(res.body.links[0]).to.be.a('object');
      expect(res.body.links[0]).to.be.a('object').to.haveOwnProperty('rel', 'self');
      expect(res.body.links[0]).to.be.a('object').to.haveOwnProperty('action', 'POST');
    });

    it('Customer already have account', async function () {
      const res = await chai.request(url).post('/auth/signup').send(data);
      expect(res.status).to.equal(409);
      expect(res.body).to.haveOwnProperty('error');
      expect(res.body).to.haveOwnProperty('name', 'ConflictException');
    });

    it('Validate request payload', async function () {
      const emptyData = {};
      const res = await chai.request(url).post('/auth/signup').send(emptyData);
      const errorCount = res.body.errors.length;
      expect(res.status).to.equal(400);
      expect(res.body).to.haveOwnProperty('name', 'ValidationException');
      expect(res.body).to.haveOwnProperty('errors').with.lengthOf(errorCount);
      expect(res.body).to.haveOwnProperty('message', `You have (${errorCount}) errors to fix`);
    });
  });
});
