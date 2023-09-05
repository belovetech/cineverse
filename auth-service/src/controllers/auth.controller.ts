import { Request, Response, NextFunction } from "express";
import { POST_links } from "@utils/responseLink";
import { ICustomer } from "@interfaces/customers.interface";
import { SignDto, VerifyOtpDto } from "@dtos/auth.dto";
import { IRequest } from "@interfaces/auth.interface";
import { CustomerDto } from "@dtos/customers.dto";
import AuthService from "@services/auth.service";
import ApiResponseFormatter from "@utils/apiResponseFormatter";

export default class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const customerData = req.body as CustomerDto;
      const newCustomer: ICustomer = await AuthService.signup(customerData);
      const apiResponseFormatter = new ApiResponseFormatter(newCustomer, POST_links);
      return res.status(201).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }

  public async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: SignDto = req.body;
      const { customer, token } = await AuthService.signin(payload);
      const apiResponseFormatter = new ApiResponseFormatter(customer);
      res.cookie("Authorization", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1hr
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        path: "/", // all routes
      });
      return res.status(200).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }

  public async signout(req: IRequest, res: Response, next: NextFunction) {
    try {
      const customer = req.customer as CustomerDto;
      await AuthService.signout(customer);
      res.cookie("Authorization", "");
      return res.status(200).json({ message: "Signout Successfully" });
    } catch (error) {
      return next(error);
    }
  }

  public async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const otp = await AuthService.sendOtp(req.body?.email);
      return res.status(200).json({ otp });
    } catch (error) {
      return next(error);
    }
  }

  public async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: VerifyOtpDto = req.body;
      const customer: ICustomer = await AuthService.verifyOtp(payload);
      const apiResponseFormatter = new ApiResponseFormatter(customer);
      return res.status(200).json(apiResponseFormatter.format());
    } catch (error) {
      return next(error);
    }
  }
}
