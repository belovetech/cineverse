export interface IResponse {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  links?: {
    self: string;
    related?: {
      [key: string]: string;
    };
  };
}
