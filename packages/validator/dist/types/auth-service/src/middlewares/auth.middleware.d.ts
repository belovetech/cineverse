import { Response, NextFunction } from "express";
export declare const authMiddleware: (req: IRequest, res: Response, next: NextFunction) => Promise<void>;
