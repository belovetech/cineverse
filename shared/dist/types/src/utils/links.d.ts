import { ILink } from '@interfaces/link.interface';
type LinkMethods = 'post' | 'get' | 'update';
export declare const movieLinks: Record<LinkMethods, ILink[]>;
export declare const theaterLinks: Record<LinkMethods, ILink[]>;
export declare const showtimeLinks: Record<LinkMethods, ILink[]>;
export declare const seatLinks: Record<LinkMethods, ILink[]>;
export {};
