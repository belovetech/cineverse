type QueryType = Record<string, any>;

type PaginateResult = [number, number];

export interface Metadata {
  total: number;
  itemPerPage: number;
}

export default class ApiFeaturesHandler {
  private queryString: QueryType;
  private page: number;

  constructor(queryString: QueryType) {
    this.queryString = queryString;
  }

  public filter(): QueryType {
    const filteredQuery = { ...this.queryString };
    const excludedFields = ['limit', 'sort', 'fields', 'page'];
    excludedFields.forEach(field => delete filteredQuery[field]);
    return filteredQuery;
  }

  public getFieldsQuery(): any {
    let fieldsQuery: QueryType | string[];
    if (this.queryString.fields) {
      fieldsQuery = this.queryString.fields.split(',');
    } else {
      fieldsQuery = { exclude: ['updatedAt'] };
    }
    return fieldsQuery;
  }

  public sort(): any {
    const sortQuery = [];
    if (this.queryString.sort) {
      sortQuery.push(this.queryString.sort);
    } else {
      sortQuery.push('updatedAt');
    }
    sortQuery.push('DESC');
    return [sortQuery];
  }

  public paginate(): PaginateResult {
    this.page = parseInt(this.queryString.page);
    let limit = parseInt(this.queryString.limit);

    if (isNaN(this.page) || this.page <= 0) this.page = 1;
    if (isNaN(limit) || limit <= 0) limit = 5;

    const offset = (this.page - 1) * limit;
    return [offset, limit];
  }

  public getMetadata(option: Metadata) {
    const [_offset, limit] = this.paginate();
    let totalPage = Math.ceil(option.total / limit);
    const currentPage = this.page;
    const previousPage = currentPage <= 1 ? null : currentPage - 1;
    const nextPage = totalPage <= currentPage ? null : currentPage + 1;

    const metadata = {
      total_items: option.total,
      item_per_page: option.itemPerPage,
      total_page: totalPage,
      previous_page: previousPage,
      current_page: currentPage,
      next_page: nextPage,
    };
    return metadata;
  }
}
