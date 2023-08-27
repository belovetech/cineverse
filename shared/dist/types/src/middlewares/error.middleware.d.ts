declare const errorMiddleware: (err: Exception, req: Request, res: Response, next: NextFunction) => any;
export default errorMiddleware;
