import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import config from '../src/config';
import database from '../src/datasource/index';
import Theater from '../src/models/theater';

chai.use(chaiHttp);

let theaterId: string;
describe('#Theater', function () {
  let sequelize;

  before(async function () {
    sequelize = await database.getInstance();
    sequelize.options.logging = false;
    Theater.drop();
  });

  afterEach(async function () {
    await sequelize.close();
  });

  const url = config.apiUrl || 'http://localhost:3000/v1';
  const data = {
    name: 'Shoprite',
    location: 'No 24 Tanke fante, Ilorin , Kwara state.',
    seatingCapacity: 1500,
  };

  describe('[POST] Create Theater', () => {
    it('should create a new theater', async () => {
      const res = await chai.request(url).post('/theaters').send(data);
      expect(res.status).to.equal(201);
      expect(res.body.name).to.be.equal(data.name);
      expect(res.body.location).to.be.equal(data.location);
      expect(res.body.seatingCapacity).to.be.equal(data.seatingCapacity);
      expect(res.body).to.haveOwnProperty('links');
    });

    it('should return conflict error', async () => {
      const res = await chai.request(url).post('/theaters').send(data);
      expect(res.status).to.equal(409);
      expect(res.body.name).to.equal('ConflictException');
      expect(res.body.error).to.equal('Theater already exist');
    });
  });

  describe('[GET] Get Theater', () => {
    it('should get theaters', async () => {
      const res = await chai.request(url).get('/theaters');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.haveOwnProperty('metadata');
      expect(res.body).to.haveOwnProperty('data');
      expect(res.body.data).to.be.an('array');
      theaterId = res.body.data[0]?.theaterId;
    });
  });

  describe('[GET] Get Theater', () => {
    it('should get a theater', async () => {
      const res = await chai.request(url).get(`/theaters/${theaterId}`);
      expect(res.status).to.be.equal(200);
      expect(res.body.theaterId).to.be.equal(theaterId);
    });

    it('should return null ', async () => {
      const res = await chai.request(url).get('/theaters/abfkgkkke');
      expect(res.status).to.be.equal(500);
      expect(res.body.name).to.be.equal('SequelizeDatabaseError');
      expect(res.body.error).to.be.equal('invalid input syntax for type uuid: "abfkgkkke"');
    });
  });
});
