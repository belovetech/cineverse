import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import config from '../src/config';
import Customer from '../src/models/customers.model';
import mongoClient from '../src/datasource/database';

chai.use(chaiHttp);

describe('Customer Endpoint Testing', function () {
  before(async () => {
    this.timeout(5000);
    await mongoClient.connect();
    await Customer.deleteMany({});
  });

  afterEach(async () => {
    await mongoClient.disconnect();
  });

  const url = config.api_Url || 'http://localhost:8000/v1';

  const data = {
    firstName: 'Unit',
    lastName: 'Test',
    email: 'unitest@gmail.com',
    password: 'Password!',
    passwordConfirm: 'Password!',
  };
  let id;

  describe('[POST] Create a new customer', function () {
    it('Create a new customer', async function () {
      const res = await chai.request(url).post('/customers').send(data);
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('links');
      expect(res.body).to.have.property('email').to.equal(data.email);
      expect(res.body).to.have.property('isVerified').to.equal(false);
      id = res.body.customerId; // store customer id
    });

    it('Customer already exist', async function () {
      const errorMessage = 'Conflict:: Customer already exists.';
      const res = await chai.request(url).post('/customers').send(data);
      expect(res.status).to.be.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').to.equal(errorMessage);
      expect(res.body).to.have.property('name').to.equal('ConflictException');
    });
  });

  describe('[GET] get customer', function () {
    it('[GET] get customer by id', async function () {
      const res = await chai.request(url).get(`/customers/${id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('links');
      expect(res.body).to.have.property('customerId');
      expect(res.body).to.have.property('isVerified');
      expect(res.body).to.not.have.property('password');
    });

    it('[GET] get all customers', async function () {
      const res = await chai.request(url).get('/customers');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('[Update] get customer', function () {
    it('Update customer data', async function () {
      const data = { firstName: 'Karl', lastName: 'Mark' };
      const keys = ['customerId', 'firstName', 'lastName', 'email', 'isVerified'];

      const res = await chai.request(url).patch(`/customers/${id}`).send(data);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('firstName').deep.equal(data.firstName);
      expect(res.body).to.have.property('lastName').deep.equal(data.lastName);
      expect(res.body).to.include.all.keys(...keys);
    });
  });
});
