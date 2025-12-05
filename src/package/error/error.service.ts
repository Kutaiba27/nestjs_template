import { ErrorFactory } from "./error.factory";
import { IError, IErrorService } from "./error.interface";

export  class ErrorService implements IErrorService {
    constructor(
        private readonly errorType: string,
    ) {
    }
    throw(error: IError,statusCode: number = 400, context?: any): never {
        throw ErrorFactory.createError({
            code: error.code ,
            message: error.message,
            statusCode,
            errorType: this.errorType,
        });
    }
    error(error: IError,statusCode: number = 400 ,context?: any): IError {
        return ErrorFactory.createError({
            code: error.code ,
            message: error.message,
            statusCode,
            errorType: this.errorType,
        });
    }
}