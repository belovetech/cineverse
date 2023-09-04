import { Router } from "express";
import { HealthCheck } from "@controllers";
import { IRoute } from "@interfaces";

export default class HealthCheckRoute implements IRoute {
  public path? = "/ping";
  public router: Router = Router();
  public healthcheck = new HealthCheck();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.healthcheck.ping);
  }
}
