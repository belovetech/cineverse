import { expect } from 'chai';
import { TheaterValidator, MovieValidator, SeatValidator, ShowtimeValidator } from '../../src/validators';
import { TheaterDto, MovieDto, SeatDto, ShowTimeDto } from '../../src/dtos';
import { BadRequestException } from '../../../packages/shared-libs/src/exceptions';

describe('#Validators', () => {
  describe('#MovieValidator', () => {
    const movieData = {
      movieId: '03bb3726-baf1-454f-8d22-d82b01bcad9b',
      title: 'The Murderer2',
      genre: 'Action',
      description: 'After a series of deaths in a small provincial town.',
      duration: '120m',
    } as MovieDto;

    it('should return no errors', () => {
      const validator = new MovieValidator(movieData);
      validator.validate();
      expect(validator.errorCounter).to.equal(0);
      expect(validator.payload).equal(movieData);
      expect(validator.errors).be.empty;
    });

    it('should return 4 errors', () => {
      try {
        new MovieValidator({} as MovieDto).validate();
      } catch (error) {
        const { message, errors } = JSON.parse(error.message);
        expect(message).to.equal('You have (4) errors to fix');
        expect(Object.keys(errors).length).to.equal(4);
      }
    });

    it('should throw BadRequestException', () => {
      const validator = new MovieValidator({} as MovieDto);
      expect(() => validator.validate()).to.throw(BadRequestException);
    });
  });

  describe('#TheaterValidator', () => {
    const theaterData = {
      name: 'Theater 1',
      location: 'Location 1',
      seatingCapacity: 100,
    } as TheaterDto;

    it('should return no errors', () => {
      const validator = new TheaterValidator(theaterData);
      validator.validate();
      expect(validator.errorCounter).to.equal(0);
      expect(validator.payload).equal(theaterData);
      expect(validator.errors).be.empty;
    });

    it('should return 3 errors', () => {
      try {
        new TheaterValidator({} as TheaterDto).validate();
      } catch (error) {
        const { message, errors } = JSON.parse(error.message);
        expect(message).to.equal('You have (3) errors to fix');
        expect(Object.keys(errors).length).to.equal(3);
      }
    });

    it('should throw BadRequestException', () => {
      const validator = new TheaterValidator({} as TheaterDto);
      expect(() => validator.validate()).to.throw(BadRequestException);
    });
  });

  describe('#SeatValidator', () => {
    const seatData = {
      seatNumber: 'A1',
      seatType: 'regular',
      status: 'available',
      theaterId: '03bb3726-baf1-454f-8d22-d82b01bcad9b',
    } as SeatDto;

    it('should return no errors', () => {
      const validator = new SeatValidator(seatData);
      validator.validate();
      expect(validator.errorCounter).to.equal(0);
      expect(validator.payload).equal(seatData);
      expect(validator.errors).be.empty;
    });

    it('should return 4 errors', () => {
      try {
        new SeatValidator({} as SeatDto).validate();
      } catch (error) {
        const { message, errors } = JSON.parse(error.message);
        expect(message).to.equal('You have (4) errors to fix');
        expect(Object.keys(errors).length).to.equal(4);
      }
    });

    it('should throw BadRequestException', () => {
      const validator = new SeatValidator({} as SeatDto);
      expect(() => validator.validate()).to.throw(BadRequestException);
    });
  });

  describe('#ShowtimeValidator', () => {
    const showtimeData = {
      startTime: '15:00',
      endTime: '16:30',
      date: '2023-09-03',
      movieId: 'bf318a4f-9723-4a81-8835-b63d278016bf',
      theaterId: '20c1f338-71f0-4269-851c-7b546e0ef687',
    } as ShowTimeDto;

    it('should return no errors', () => {
      const validator = new ShowtimeValidator(showtimeData);
      validator.validate();
      expect(validator.errorCounter).to.equal(0);
      expect(validator.payload).equal(showtimeData);
      expect(validator.errors).be.empty;
    });

    it('should return 6 errors', () => {
      try {
        new ShowtimeValidator({} as ShowTimeDto).validate();
      } catch (error) {
        const { message, errors } = JSON.parse(error.message);
        expect(message).to.equal('You have (6) errors to fix');
        expect(Object.keys(errors).length).to.equal(6);
      }
    });

    it('should throw BadRequestException', () => {
      const validator = new ShowtimeValidator({} as ShowTimeDto);
      expect(() => validator.validate()).to.throw(BadRequestException);
    });
  });
});
