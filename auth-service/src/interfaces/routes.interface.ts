import { Router } from "express";

interface IRoute {
  path?: string;
  router: Router;
}

export default IRoute;

export interface IPaths {
  method: string;
  path: string;
  description?: string;
}

export type IPathsArray = IPaths[];
