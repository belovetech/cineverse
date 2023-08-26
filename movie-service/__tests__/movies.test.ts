import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import config from '../src/config';
import database from '../src/datasource/index';

chai.use(chaiHttp);

let movieId: string;
describe('#Movies', function () {
  let sequelize;

  before(async function () {
    sequelize = await database.getInstance();
    sequelize.options.logging = false;
    await sequelize.sync({ force: true, match: /_test$/ });
  });

  afterEach(async function () {
    await sequelize.close();
  });

  after(async function () {
    exports.movieId = movieId;
  });

  const url = config.apiUrl || 'http://localhost:3000/v1';
  const data = {
    title: 'The Murderer',
    genre: 'Action',
    description: 'After a series of deaths in a small provincial town.',
    duration: '120m',
  };

  describe('[POST] Create Movie', () => {
    it('should create a new movie', async () => {
      const expectedProperties = ['movieId', 'title', 'genre', 'description', 'duration', 'photo', 'links'];
      const res = await chai.request(url).post('/movies').send(data);
      expect(res.status).to.equal(201);
      expect(res.body).to.include.keys(...expectedProperties);
      expect(res.body).to.haveOwnProperty('links');
      expect(res.body.links[0]).to.include.keys('rel', 'href', 'action', 'types');
    });

    it('should return conflict error', async () => {
      try {
        chai.request(url).post('/movies').send(data);
      } catch (error) {
        expect(error.status).to.equal(409);
        expect(error.body.name).to.equal('ConflictException');
        expect(error.body.error).to.equal('seat already exist');
      }
    });
  });

  describe('[GET] Get movies', () => {
    it('should get all movies', async () => {
      const res = await chai.request(url).get('/movies');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.haveOwnProperty('metadata');
      expect(res.body).to.haveOwnProperty('data');
      expect(res.body.data).to.be.an('array');
      movieId = res.body.data[0]?.movieId;
    });
  });

  describe('[GET] Get movie', () => {
    it('should get a movie', async () => {
      const res = await chai.request(url).get(`/movies/${movieId}`);
      expect(res.status).to.be.equal(200);
      expect(res.body.movieId).to.be.equal(movieId);
      expect(res.body.genre).to.be.equal('Action');
    });

    it('should return NotFoundException ', async () => {
      const res = await chai.request(url).get('/movies/1e8265cf-1607-4543-8110-f27c9ea9aa67');
      expect(res.status).to.be.equal(404);
      expect(res.body.name).to.be.equal('NotFoundException');
      expect(res.body.error).to.be.equal('Movie not found');
    });
  });
});
