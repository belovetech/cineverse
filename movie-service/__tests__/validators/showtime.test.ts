// import { expect } from 'chai';
// import { TheaterDataValidator } from '../../src/validators/theaterDataValidator';
// import { BadRequestException } from '../../../libs/src/index';

// interface Theater {
//   theaterId?: string;
//   name: string;
//   location: string;
//   seatingCapacity: number;
// }

// describe('#TheaterDataValidator', () => {
// const theaterData: Theater = {
//   name: 'Theater 1',
//   location: 'Location 1',
//   seatingCapacity: 100,
// };
// it('should return no errors', () => {
//   const validator = new TheaterDataValidator(theaterData);
//   validator.validate();
//   expect(validator.errorCounter).to.equal(0);
//   expect(validator.payload).equal(theaterData);
//   expect(validator.errors).equal({});
// });
// it('should return 3 errors', () => {
//   const validator = new TheaterDataValidator({} as Theater);
//   try {
//     validator.validate();
//   } catch (error) {
//     const { message, errors } = JSON.parse(error.message);
//     expect(message).to.be('You have (3) errors to fix');
//     expect(Object.keys(errors).length).to.equal(3);
//   }
// });
// it('should throw BadRequestException', () => {
//   const validator = new TheaterDataValidator({} as Theater);
//   expect(() => validator.validate()).to.throw(BadRequestException);
// });
// });
