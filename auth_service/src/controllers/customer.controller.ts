import { Request, Response, NextFunction } from 'express';
import CustomerDto from '@dtos/customers.dto';
import CustomerService from '@services/customer.service';
import APIResponse from '@utils/apiResponse';

export class CustomerController {
  public async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerData: CustomerDto = req.body;
      const customer = await CustomerService.createCustomer(customerData);
      const apiResponse = new APIResponse(req, customer);
      const options = {
        message: 'Customer was successfully created.',
        paths: {
          getme: `${customer._id}`,
          login: `login`,
        },
      };
      return res.status(201).json(apiResponse.format(options));
    } catch (error) {
      return next(error);
    }
  }

  public async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await CustomerService.findAllCustomers();
      const { getData } = new APIResponse(req);
      const formattedCustomers = customers.map(customer => getData(customer));
      return res.status(200).json(formattedCustomers);
    } catch (error) {
      return next(error);
    }
  }

  public async getCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await CustomerService.findCustomerById(req.params.id);
      const apiResponse = new APIResponse(req, customer);
      const options = {
        message: 'Customer was successfully fetched.',
        paths: {
          updateMe: `${customer._id}`,
          login: `logout`,
        },
      };
      return res.status(200).json(apiResponse.format(options));
    } catch (error) {
      return next(error);
    }
  }

  public async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCustomer = await CustomerService.updateCustomer(req.params.id, req.body);
      const apiResponse = new APIResponse(req, updatedCustomer);
      const options = {
        message: 'Customer was successfully updated.',
        paths: {
          deleteMe: `${updatedCustomer._id}`,
          login: `logout`,
        },
      };
      return res.status(200).json(apiResponse.format(options));
    } catch (error) {
      return next(error);
    }
  }

  public async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedCustomer = await CustomerService.deleteCustomer(req.params.id);
      return res.status(204).json(deletedCustomer);
    } catch (error) {
      return next(error);
    }
  }
}
