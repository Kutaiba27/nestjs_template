import {
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { ErrorServiceFactory } from "@Package/error";
import { ClientSideErrorCode } from "@Common/error";
import { StrategyConstant } from "../passport/strategy/strategy.constant";

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyConstant.jwt) {
  private readonly logger = new Logger(JwtAuthGuard.name);
  private authError = ErrorServiceFactory.createErrorService(JwtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers["authorization"]?.split(" ")[1] === "null") {
      this.authError.throw(ClientSideErrorCode.AUTH.ACCESS_TOKEN_NOT_EXIST);
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext): TUser {
    this.logger.debug("JWT Auth request", { err, user: !!user, info });
    if (err || !user) {
      this.authError.throw(ClientSideErrorCode.AUTH.INVALID_TOKEN);
    }
    return user;
  }
}
