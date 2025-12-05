import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { StrategyConstant } from "./strategy.constant";
import { ICacheService } from "@Infrastructure/cache";
import { EnvironmentService } from "@Infrastructure/config";
import { ErrorServiceFactory } from "@Package/error/error-service-factory";
import { IErrorService } from "@Package/error/error.interface";
import { ClientSideErrorCode } from "@Common/error";
import { AccountPayload } from "@Package/auth/types";
@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  StrategyConstant.jwt,
) {
  private readonly errorService: IErrorService = ErrorServiceFactory.createErrorService(JwtStrategy.name);
  constructor(
    private readonly redisService: ICacheService,
    private readonly jwtService: JwtService,
    private readonly environmentService: EnvironmentService,

  ) {
    const secretKey = environmentService.get('jwt.jwtAccessSecret');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const authToken = await this.redisService.get(`${payload.id}`)
    if (!authToken ) this.errorService.throw(ClientSideErrorCode.AUTH.EXPIRED_ACCESS_TOKEN);
    const redisPayload: AccountPayload = this.jwtService.decode(authToken as string);
    return { ...payload };
  }
}
