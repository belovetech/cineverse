import { ILink } from '@interfaces/link.interface';
export default class ApiResponseFormatter<T> {
    private data;
    private linkOptions?;
    private id;
    constructor(data: T, linkOptions?: ILink[]);
    private getData;
    private getLinks;
    format(): Record<string, unknown>;
}
