export interface ILink {
    rel: string;
    href: string;
    action: string;
    types?: Array<string>;
}
export interface IResponse {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    isVerified?: boolean;
    links?: Array<ILink>;
}
