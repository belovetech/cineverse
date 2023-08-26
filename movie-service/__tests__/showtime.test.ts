import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import config from '../src/config';
import database from '../src/datasource/index';
import Showtime from '../src/models/showtime';

chai.use(chaiHttp);

describe('#Showtime', () => {
  let sequelize;

  before(async () => {
    sequelize = await database.getInstance();
    sequelize.options.logging = false;
    Showtime.drop();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const url = config.apiUrl || 'http://localhost:3000/v1';
  const movie = {
    title: 'The Murderer2',
    genre: 'Action',
    description: 'After a series of deaths in a small provincial town.',
    duration: '120m',
  };
  const theater = {
    name: 'MovieStar',
    location: 'No 24 Tanke fante, Ilorin , Kwara state.',
    seatingCapacity: 1500,
  };
  let data;

  describe('[POST] Create Showtime', () => {
    it('should create a new showtime', async () => {
      const [movieResponse, theaterResponse] = await Promise.all([
        await chai.request(url).post('/movies').send(movie),
        await chai.request(url).post('/theaters').send(theater),
      ]);

      data = {
        startTime: '12:00',
        endTime: '13:00',
        date: '2023-08-30',
        movieId: movieResponse.body.movieId,
        theaterId: theaterResponse.body.theaterId,
      };
      const res = await chai.request(url).post('/showtimes').send(data);
      expect(res.status).to.equal(201);
      expect(res.body.startTime).to.be.equal(data.startTime);
      expect(res.body.endTime).to.be.equal(data.endTime);
      expect(res.body.date).to.be.equal(new Date(data.date).toISOString());
      expect(res.body.movieId).to.be.equal(data.movieId);
      expect(res.body.theaterId).to.be.equal(data.theaterId);
      expect(res.body).to.haveOwnProperty('links');
    });

    it('should return conflict error', async () => {
      const res = await chai.request(url).post('/showtimes').send(data);
      expect(res.status).to.equal(409);
      expect(res.body.name).to.equal('ConflictException');
      expect(res.body.error).to.equal('Show time already exist');
    });
  });

  let showTimeId: string;
  describe('[GET] Get Showtime', () => {
    it('should get showtimes', async () => {
      const res = await chai.request(url).get('/showtimes');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.haveOwnProperty('metadata');
      expect(res.body).to.haveOwnProperty('data');
      expect(res.body.data).to.be.an('array');
      showTimeId = res.body.data[0]?.showTimeId;
    });
  });

  describe('[GET] Get Showtime', () => {
    it('should get a showtime', async () => {
      const res = await chai.request(url).get(`/showtimes/${showTimeId}`);
      expect(res.status).to.be.equal(200);
      expect(res.body.showTimeId).to.be.equal(showTimeId);
    });

    it('should return null ', async () => {
      const res = await chai.request(url).get('/showtimes/abfkgkkke');
      expect(res.status).to.be.equal(500);
      expect(res.body.name).to.be.equal('SequelizeDatabaseError');
      expect(res.body.error).to.be.equal('invalid input syntax for type uuid: "abfkgkkke"');
    });
  });
});
