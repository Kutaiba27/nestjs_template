import { applyDecorators, createParamDecorator, Delete, ExecutionContext, Get, Patch, Post, Put, Type } from "@nestjs/common";
import { Request } from "express"
import { queryParser } from "../functions";
import { ExcludeQuery, IPagination, IQuery, PaginationRequest } from "../interfaces";
import { ApiResponse } from "@nestjs/swagger";


export const Headers = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.headers.languageKey = request.headers["accept-language"] ;
    return request.headers;
  },
);

export const Queries = createParamDecorator(
  <T = any>(data: string[], ctx: ExecutionContext): ExcludeQuery<T> => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const query = request.query
    const {pagination, queryData} =  queryParser(query) as IQuery<T> 
    return queryData as ExcludeQuery<T> ;
  },
);

export const Pagination = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IPagination => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const query = request.query
    const {pagination} =  queryParser<PaginationRequest>(query as PaginationRequest) as IQuery<PaginationRequest> 
    return pagination;
  },
);

export function PostMethod(options: {
  path: string;
  responseType?: Type<any>;
}) {
  const { path, responseType = null } = options;
  return applyDecorators(
    ApiResponse({
      type: responseType,
    }),
    Post(path),
  )
}

export function GetMethod(options: {
  path: string;
  responseType: Type<any>;
}) {
  const { path, responseType } = options;
  return applyDecorators(
    ApiResponse({
      type: responseType
    }),
    Get(path),
  )
}

export function PutMethod(options: {
  path: string;
  responseType?: Type<any>;
}) {
  const { path, responseType = null } = options;
  return applyDecorators(
    ApiResponse({
      type: responseType
    }),
    Put(path),
  )
}

export function DeleteMethod(options: {
  path: string;
  responseType: Type<any>;
}) {
  const { path, responseType } = options;
  return applyDecorators(
    ApiResponse({
      type: responseType
    }),
    Delete(path),
  )
}

export function PatchMethod(options: {
  path: string;
  responseType: Type<any>;
}) {
  const { path, responseType } = options;
  return applyDecorators(
    ApiResponse({
      type: responseType
    }),
    Patch(path),
  )
}