import { Request, Response, NextFunction } from "express";
export declare class CustomerController {
    createCustomer(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getCustomers(_req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getCustomer(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    updateCustomer(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    deleteCustomer(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
