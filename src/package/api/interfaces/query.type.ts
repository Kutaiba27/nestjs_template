import { IPagination, PaginationRequest } from "./pagination.interface";

export type QueryValue<T> = Omit<T, keyof PaginationRequest>

export type ExcludeQuery<T> = {
  [K in keyof QueryValue<T>]: T[K]
};

export type IQuery<T = any> = { pagination:IPagination, queryData:ExcludeQuery<T> } 
