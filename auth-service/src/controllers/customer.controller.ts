import { Request, Response, NextFunction } from "express";
import { ICustomer } from "@interfaces/customers.interface";
import CustomerService from "@services/customer.service";
import ApiResponseFormatter from "@utils/apiResponseFormatter";
import { GET_links, UPDATE_links, POST_links } from "@utils/responseLink";

export class CustomerController {
  public async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerData: ICustomer = req.body;
      const customer = await CustomerService.createCustomer(customerData);
      const apiResponseFormatter = new ApiResponseFormatter(customer, POST_links);
      return res.status(201).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }

  public async getCustomers(_req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await CustomerService.findAllCustomers();
      const formattedCustomers = customers.map(customer => new ApiResponseFormatter(customer).format());
      return res.status(200).json(formattedCustomers);
    } catch (error) {
      return next(error);
    }
  }

  public async getCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await CustomerService.findCustomerById(req.params.id);
      const apiResponseFormatter = new ApiResponseFormatter(customer, GET_links);
      return res.status(200).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }

  public async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCustomer = await CustomerService.updateCustomer(req.params.id, req.body);
      const apiResponseFormatter = new ApiResponseFormatter(updatedCustomer, UPDATE_links);
      return res.status(200).json(apiResponseFormatter.format());
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
