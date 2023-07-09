import Router from 'express';
import IRoute from '@interfaces/routes.interface';
import { CustomerController } from '@controllers/customer.controller';

export default class CustomerRoute implements IRoute {
  public path? = '/customers';
  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(`${this.path}`, this.customerController.createCustomer);
  }
}
