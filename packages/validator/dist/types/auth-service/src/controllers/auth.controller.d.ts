import { Request, Response, NextFunction } from "express";
import { IRequest } from "@interfaces/auth.interface";
export declare class AuthController {
    signup(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    login(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    logout(req: IRequest, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    sendOtp(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
