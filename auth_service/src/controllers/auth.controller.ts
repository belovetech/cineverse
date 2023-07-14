import { Request, Response, NextFunction } from 'express';
import AuthService from '@services/auth.service';
import ApiResponseFormatter from '@utils/apiResponseFormatter';
import { POST_links } from '@utils/responseLink';
import { ICustomer } from '@interfaces/customers.interface';
import { LoginDto, VerifyOtpDto } from '@dtos/auth.dto';

export class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const customerData: ICustomer = req.body;
      const newCustomer: ICustomer = await AuthService.signup(customerData);
      const apiResponseFormatter = new ApiResponseFormatter(newCustomer, POST_links);
      return res.status(201).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: LoginDto = req.body;
      const customer: ICustomer = await AuthService.signin(payload);
      const apiResponseFormatter = new ApiResponseFormatter(customer);
      return res.status(200).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }

  public async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: VerifyOtpDto = req.body;
      const customer: ICustomer = await AuthService.verifyOtp(payload);
      const apiResponseFormatter = new ApiResponseFormatter(customer);
      return res.status(200).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }
}
