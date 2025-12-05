import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppError } from '@Package/error';
import { IResponseError } from '@Package/error/error.interface'; 

@Catch(AppError)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse();
    const request: Request = host.switchToHttp().getRequest();
    console.log("AppExceptionFilter :", exception);
    const errorResponse: IResponseError = {
      path: request.path,
      method: request.method,
      timestamp: new Date(),
      message: exception.message,
      code: exception.code,
      errorType: exception.errorType, 
    };

    console.error(`[${new Date().toISOString()}] [${exception.errorType}] ${exception.message}`, {
      path: request.path,
      ErrorSystem: exception.code,
    });
    response.status(exception.statusCode ?? 400).json({ error: errorResponse });
  }
}
