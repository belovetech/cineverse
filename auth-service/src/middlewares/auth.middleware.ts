import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '@config';
import { AuthenticationException, NotFoundException } from '@exceptions';
import Customer from '@models/customers.model';
import { IRequest } from '@interfaces/auth.interface';

export const authMiddleware = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers?.authorization || req.cookies?.authorization;
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      const token = authorization.split(' ')[1];
      if (!token) throw new AuthenticationException('Authentication token missing');
      const valid = await jwt.verify(token, config.secret);

      if (!valid.customerId) throw new AuthenticationException('JWT malformed or invalid');
      const customer = await Customer.findById(valid.customerId).exec();
      if (!customer) throw new NotFoundException();
      req.customer = customer;
      next();
    } else {
      throw new AuthenticationException('Invalid authentication token');
    }
  } catch (error) {
    next(error);
  }
};
