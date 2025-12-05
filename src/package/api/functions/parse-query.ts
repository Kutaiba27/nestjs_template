import { ExcludeQuery, paginationKeys, PaginationRequest, IQuery } from "../interfaces";



export function queryParser<T extends PaginationRequest>(query: T ): IQuery<T> {
  query.limit = +(query.limit ?? 30);
  query.page = +(query.page ?? 0);
  let myQuery: ExcludeQuery<T> = {} as ExcludeQuery<T>;
  Object.keys(query).forEach((key: string) => {
    if (!paginationKeys.includes(key)) {
      myQuery[key] = query[key];
    }
  })
  
  return {
    pagination: {
      skip: query.page * query.limit,
      limit: query.limit,
      needPagination: query.needPagination ?? true,
      total: query.total ?? true,
    },
    queryData: myQuery
  }
}