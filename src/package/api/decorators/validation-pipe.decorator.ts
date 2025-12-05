import { UsePipes, ValidationPipeOptions } from "@nestjs/common"
import { ErrorFactory } from "@Package/error"
import { ValidationPipe } from "@nestjs/common"
import { ClientSideErrorCode } from "@Common/error"


export function ValidationPipeDecorator(options: ValidationPipeOptions) {
    return UsePipes(new ValidationPipe({
        ...options,
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory(errors) {
            return ErrorFactory.createError({
                code: ClientSideErrorCode.VALIDATION.VALIDATION_ERROR.code,
                message: Object.values(errors[0].constraints ?? {}).join(', '),
                errorType: 'VALIDATION_ERROR',
            })
        },
    }))
}   