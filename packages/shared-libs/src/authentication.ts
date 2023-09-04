import { sign, verify } from 'jsonwebtoken';

export const generateToken = (payload: unknown, secretKey: string) => {
  return sign(payload, secretKey, { expiresIn: '1d' });
};

export const verifyToken = (token: string, secretKey: string) => {
  try {
    return verify(token, secretKey, { ignoreExpiration: false });
  } catch (error) {
    return error;
  }
};
