import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import jwt from 'jsonwebtoken';
import config from '../src/config/index';
import MongoClient from '../src/datasource/database';
import Customer from '../src/models/customers.model';

chai.use(chaiHttp);

describe('Authentication Endpoint Testing', function () {
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
  let customerId, token;

  describe('[POST] Signup Endpoint', function () {
    it('Signup with invalid payloads', async function () {
      const emptyData = {};
      const res = await chai.request(url).post('/auth/signup').send(emptyData);
      const errorCount = res.body.errors.length;
      expect(res.status).to.equal(400);
      expect(res.body).to.haveOwnProperty('name', 'ValidationException');
      expect(res.body).to.haveOwnProperty('errors').with.lengthOf(errorCount);
      expect(res.body).to.haveOwnProperty('message', `You have (${errorCount}) errors to fix`);
    });

    it('Signup with a valid payloads', async function () {
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
      customerId = res.body.customerId;
    });

    it('Customer already have an account', async function () {
      const res = await chai.request(url).post('/auth/signup').send(data);
      expect(res.status).to.equal(409);
      expect(res.body).to.haveOwnProperty('error');
      expect(res.body).to.haveOwnProperty('name', 'ConflictException');
    });
  });

  describe('[POST] OTP Verification', function () {
    let otp;
    it('Should not create user if user has not been verified', async function () {
      const loginData = { email: data.email, password: data.password };
      const message = 'Verify your account before signing in.';
      const res = await chai.request(url).post('/auth/login').send(loginData);
      expect(res.status).to.equal(401);
      expect(res.body).to.haveOwnProperty('name', 'AuthenticationException');
      expect(res.body).to.haveOwnProperty('error', message);
    });

    it('Send otp to the customer email ', async function () {
      const payload = { email: data.email };
      const res = await chai.request(url).post('/auth/otp').send(payload);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('otp');
      expect(res.body.otp).to.be.a('number');
      otp = res.body.otp.toString();
      expect(otp).to.have.lengthOf(6);
    });

    it('Verify customer with otp ', async function () {
      const payload = { email: data.email, otp: otp };
      const res = await chai.request(url).post('/auth/verify').send(payload);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.haveOwnProperty('isVerified', true);
    });
  });

  describe('[POST] Login Endpoint', function () {
    it('Login with wrong credentials', async function () {
      const payload = { email: data.email, password: 'wrongPassword' };
      const message = 'Please check your email and password';
      const res = await chai.request(url).post('/auth/login').send(payload);
      expect(res.status).to.equal(401);
      expect(res.body).to.haveOwnProperty('name', 'AuthenticationException');
      expect(res.body).to.haveOwnProperty('error', message);
    });

    it('Login with correct credentials', async function () {
      const payload = { email: data.email, password: data.password };
      const res = await chai.request(url).post('/auth/login').send(payload);
      const authorization = res.header['set-cookie'][0]?.split('=');
      token = authorization[1].split(';')[0];
      const isValidJWT = await jwt.verify(token, config.secret);
      expect(res.status).to.equal(200);
      expect(res.header['set-cookie']).to.be.an('array');
      expect(authorization[0]).to.be.equal('Authorization');
      expect(isValidJWT).to.have.property('customerId');
      expect(isValidJWT['customerId']).to.equal(customerId);
      expect(res.header['content-length']).to.equal('143');
    });
  });

  describe('[POST] Logout Endpoint', function () {
    it('should test for invalid auth token', async function () {
      const res = await chai.request(url).post('/auth/logout');
      expect(res.status).to.equal(401);
      expect(res.body).to.haveOwnProperty('name', 'AuthenticationException');
      expect(res.body).to.haveOwnProperty('error', 'Invalid authentication token');
    });

    it('should test for successful logout', async function () {
      const res = await chai
        .request(url)
        .post('/auth/logout')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).to.equal(200);
      expect(res.body).to.haveOwnProperty('message', 'Logout Successfully');
    });
  });
});
