import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, Request } from 'express';
import { IResponseError } from '../error.interface';

@Catch()
export class GlobalFilter implements ExceptionFilter{
  catch(exception: any, host: ArgumentsHost): any {
    const response: Response = host.switchToHttp().getResponse();
    const request: Request = host.switchToHttp().getRequest();
    console.log("Global Error: ",exception);
    let error: IResponseError  = {
      path: request.path,
      method: request.method,
      timestamp: new Date(),
      message: exception?.message,
      code: 50000
    }
    return response.status(500).json({
      error: error,
    });
  }
}
