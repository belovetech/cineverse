import { Response, NextFunction } from "express";
import config from "@config";
import { AuthenticationException, NotFoundException, verifyToken } from "@cineverse/libs";
import Customer from "@models/customers.model";
import { IRequest } from "@interfaces";
import redisClient from "@datasource/redis";

export const authMiddleware = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers?.authorization || req.cookies?.authorization;
    console.log(authorization);
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      const token = authorization.split(" ")[1];

      if (!token) throw new AuthenticationException("Authentication token missing");
      const isValid = verifyToken(token, config.secret);
      if (!isValid.customerId) throw new AuthenticationException("JWT malformed or invalid");

      const customer = await Customer.findById(isValid.customerId).exec();
      if (!customer) throw new NotFoundException();

      const storedToken = await redisClient.get(`x-token_${customer.customerId}`);
      if (!storedToken) throw new AuthenticationException("Authentication token missing or expired");

      req.customer = customer;
      next();
    } else {
      throw new AuthenticationException("Invalid authentication token");
    }
  } catch (error) {
    next(error);
  }
};
