import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import config from '../src/config';
import database from '../src/datasource/index';
import { Movie, ShowTime, Theater } from '../src/models';

chai.use(chaiHttp);

let showTimeId: string;
describe('#Showtime', () => {
  let sequelize;

  before(async () => {
    sequelize = await database.getInstance();
    sequelize.options.logging = false;
    Movie.drop();
    Theater.drop();
    ShowTime.drop();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const url = config.apiUrl || 'http://localhost:3000/v1';
  let data;

  describe('[POST] Create Showtime', () => {
    it('should create a new showtime', async () => {
      const movie = {
        title: 'The Murderer2',
        genre: 'Action',
        description: 'After a series of deaths in a small provincial town.',
        duration: '120m',
      };
      const theater = {
        name: '24/7 Cinema',
        location: 'No 24 Tanke fante, Ilorin , Kwara state.',
        seatingCapacity: 200,
      };
      const [movieResponse, theaterResponse] = await Promise.all([
        await chai.request(url).post('/movies').send(movie),
        await chai.request(url).post('/theaters').send(theater),
      ]);
      const now = new Date();
      data = {
        startTime: '12:00',
        endTime: '13:00',
        date: `${now.getFullYear()}-0${now.getMonth() + 1}-0${now.getDate() + 1}`,
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
      showTimeId = res.body.showTimeId;
    });

    it('should return conflict error', async () => {
      const res = await chai.request(url).post('/showtimes').send(data);
      expect(res.status).to.equal(409);
      expect(res.body.name).to.equal('ConflictException');
      expect(res.body.error).to.equal('Show time already exist');
    });
  });

  describe('[GET] Get all Showtimes', () => {
    it('should get showtimes', async () => {
      const res = await chai.request(url).get('/showtimes');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.haveOwnProperty('metadata');
      expect(res.body).to.haveOwnProperty('data');
      expect(res.body.data).to.be.an('array');
    });
  });

  describe('[GET] Get Showtime', () => {
    it('should get a showtime', async () => {
      const res = await chai.request(url).get(`/showtimes/${showTimeId}`);
      expect(res.status).to.be.equal(200);
      expect(res.body.showTimeId).to.be.equal(showTimeId);
    });

    it('should return NotFoundException ', async () => {
      const res = await chai.request(url).get('/showtimes/1e8265cf-1607-4543-8110-f27c9ea9aa67');
      expect(res.status).to.be.equal(404);
      expect(res.body.name).to.be.equal('NotFoundException');
      expect(res.body.error).to.be.equal('Show time not found');
    });
  });
});
