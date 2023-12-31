import { Router } from "express";
import { CustomerController } from "@controllers";
import { IRoute } from "@interfaces";

export default class CustomerRoute implements IRoute {
  public path = "/customers";
  public router: Router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(`${this.path}`, this.customerController.createCustomer);
    this.router.get(`${this.path}`, this.customerController.getCustomers);
    this.router.get(`${this.path}/:id`, this.customerController.getCustomer);
    this.router.patch(`${this.path}/:id`, this.customerController.updateCustomer);
    this.router.delete(`${this.path}/:id`, this.customerController.deleteCustomer);
  }
}
