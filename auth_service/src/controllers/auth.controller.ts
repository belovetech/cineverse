import { Request, Response, NextFunction } from 'express';
import AuthService from '@services/auth.service';
import ApiResponseFormatter from '@utils/apiResponseFormatter';
import { GET_links } from '@utils/responseLink';
import { ICustomer } from '@interfaces/customers.interface';

export class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const customerData: ICustomer = req.body;
      const newCustomer: ICustomer = await AuthService.signup(customerData);
      const apiResponseFormatter = new ApiResponseFormatter(newCustomer, GET_links);
      return res.status(201).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }
}
