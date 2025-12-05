import { IErrorService } from "./error.interface";
import { ErrorService } from "./error.service";

export class ErrorServiceFactory {
    public static createErrorService(serviceName: string): IErrorService {
        return new ErrorService(serviceName);
    }
}

export { IErrorService };
