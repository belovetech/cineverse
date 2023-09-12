import { sign, verify } from 'jsonwebtoken';

interface ITokenPayload {
  customerId: string;
}

export const generateToken = (payload: ITokenPayload, secretKey: string) => {
  return sign(payload, secretKey, { expiresIn: '1d' });
};

export const verifyToken = (token: string, secretKey: string) => {
  try {
    return verify(token, secretKey, { ignoreExpiration: false });
  } catch (error) {
    return error;
  }
};
