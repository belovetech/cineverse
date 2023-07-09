import { Request, Response, NextFunction } from 'express';
import { CustomerDto } from '@dtos/customers.dto';
import CustomerService from '@services/customer.service';
import formatResponse from '@utils/formatResponse';

export class CustomerController {
  public createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerData: CustomerDto = req.body;
      const customer = CustomerService.createCustomer(customerData);

      return res.status(201).json(formatResponse(customer));
    } catch (error) {
      return next(error);
    }
  }
}
