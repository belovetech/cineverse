import { Router } from "express";
import { CustomerController } from "@controllers";
import { IRoute, IPathsArray } from "@interfaces";

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

  public getPaths(): IPathsArray {
    const pathsArray: IPathsArray = [
      {
        method: "POST",
        path: `${this.path}`,
        description: "Create a customer",
      },
      {
        method: "GET",
        path: `${this.path}`,
        description: "Get all customers",
      },
      {
        method: "GET",
        path: `${this.path}/:id`,
        description: "Get a customer",
      },
      {
        method: "PATCH",
        path: `${this.path}/:id`,
        description: "Update a customer",
      },
      {
        method: "DELETE",
        path: `${this.path}/:id`,
        description: "Delete a customer",
      },
    ];
    return pathsArray;
  }
}
