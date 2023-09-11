import { validate } from 'class-validator';

interface ValidatorResponse {
  [key: string]: string;
}

export const validateDto = async (
  model: any,
  dto: any,
): Promise<ValidatorResponse[] | []> => {
  const dtoInstance = new dto();
  Object.assign(dtoInstance, model);
  const dtoErrors = await validate(dtoInstance);

  const errors = dtoErrors.map((error) => {
    return {
      [error.property]: Object.values(error.constraints)[0],
    };
  });

  return errors;
};
