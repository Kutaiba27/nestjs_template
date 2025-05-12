
import { createParamDecorator } from "@nestjs/common";


export const Headers = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.headers.languageKey =
      request.headers["accept-language"] || serverConfig.defaultLanguage;
    request.headers.priceKey = serverConfig.defaultPrice;
    // request.headers.priceKey =
    //   request.headers?.pricekey ||  serverConfig.defaultPrice;
    return request.headers;
  },
);