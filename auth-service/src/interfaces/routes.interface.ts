import { Router } from 'express';

export default interface IRoute {
  path?: string;
  router: Router;
}
