
import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const Headers = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.headers.languageKey = request.headers["accept-language"] ;
    return request.headers;
  },
);