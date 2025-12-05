
export interface IErrorService {
  throw(error: IError, statusCode?: number, context?: any): never;
  error(error: IError, statusCode?: number, context?: any): IError;
}


export interface IError {
  message: string | object;
  code: number;
  statusCode?: number
  errorType?: string;
}

export interface IResponseError extends IError {
  path: string;
  method: string;
  timestamp: Date;
}
