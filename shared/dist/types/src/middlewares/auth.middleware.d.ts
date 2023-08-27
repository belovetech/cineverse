import { Response, NextFunction } from "express";
import { IRequest } from "@interfaces/auth.interface";
export declare const authMiddleware: (req: IRequest, res: Response, next: NextFunction) => Promise<void>;
