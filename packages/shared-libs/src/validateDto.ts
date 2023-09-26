/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate } from 'class-validator';

interface ValidatorResponse {
  [key: string]: string;
}

const validateDto = async (
  model: unknown,
  dto: any
): Promise<ValidatorResponse[] | []> => {
  const dtoInstance = new dto();
  Object.assign(dtoInstance, model);
  const dtoErrors = await validate(dtoInstance);

  const errors = dtoErrors.map((error) => {
    return {
      [error.property]: error.constraints
        ? Object.values(error.constraints)[0]
        : 'Unexpected error',
    };
  });

  return errors;
};

export default validateDto;
