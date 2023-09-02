import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import config from '../src/config';
import database from '../src/datasource/index';
import Seat from '../src/models/seat';
import Theater from '../src/models/theater';

chai.use(chaiHttp);

describe('#Seat', () => {
  let sequelize;

  before(async () => {
    sequelize = await database.getInstance();
    sequelize.options.logging = false;
    Seat.drop();
    Theater.drop();
  });

  after(async () => {
    await sequelize.close();
  });

  const url = config.apiUrl || 'http://localhost:3000/v1';
  let data;
  let seatId: string;

  describe('[POST] Create seat', () => {
    it('should create a new seat', async () => {
      const theater = {
        name: 'MovieStar',
        location: 'No 24 Tanke fante, Ilorin , Kwara state.',
        seatingCapacity: 1500,
      };

      const response = await chai.request(url).post('/theaters').send(theater);
      data = {
        seatNumber: 'A5',
        seatType: 'standard',
        status: 'booked',
        theaterId: response.body.theaterId,
      };
      const res = await chai.request(url).post('/seats').send(data);
      expect(res.status).to.equal(201);
      expect(res.body.seatNumber).to.be.equal(data.seatNumber);
      expect(res.body.rowNumber).to.be.equal(data.rowNumber);
      expect(res.body.theaterId).to.be.equal(data.theaterId);
      expect(res.body.status).to.be.equal(data.status);
      seatId = res.body.seatId;
    });

    it('should return conflict error', async () => {
      const res = await chai.request(url).post('/seats').send(data);
      expect(res.status).to.equal(409);
      expect(res.body.name).to.equal('ConflictException');
      expect(res.body.error).to.equal('seat already exist');
    });
  });

  describe('[GET] Get all seats', () => {
    it('should get all seats', async () => {
      const res = await chai.request(url).get('/seats');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.haveOwnProperty('metadata');
      expect(res.body).to.haveOwnProperty('data');
      expect(res.body.data).to.be.an('array');
    });
  });

  describe('[GET] Get Seat', () => {
    it('should get a seat', async () => {
      const res = await chai.request(url).get(`/seats/${seatId}`);
      console.log(seatId, res.body);
      // expect(res.status).to.be.equal(200);
      // expect(res.body.seatId).to.be.equal(seatId);
    });

    it('should return NotFoundException ', async () => {
      const res = await chai.request(url).get('/seats/1e8265cf-1607-4543-8110-f27c9ea9aa67');
      expect(res.status).to.be.equal(404);
      expect(res.body.name).to.be.equal('NotFoundException');
      expect(res.body.error).to.be.equal('Seat not found');
    });
  });
});
