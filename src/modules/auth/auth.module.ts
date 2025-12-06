import { JwtAuthGuard, JWTModule, JwtStrategy, StrategyConstant, IHashService, HashService } from "@Package/auth";
import { AuthWebService } from "./service/auth.web.service";
import { AuthAdminService } from "./service/auth.admin.service";
import { TokenService } from "./service/token.service";
import { OTPService } from "./service/otp.service";
import { AccountModule } from "@Modules/account";
import { EmailModule } from "@Modules/email";
import { IAuthAdminService, IAuthWebService, ITokenService, IOTPService } from "./behavior";
import { Module } from "@nestjs/common";
import { AuthWebControllerBase, AuthWebControllerExtension } from "./api/controller/auth.web.controller";
import { AuthAdminController } from "./api/controller/auth.admin.controller";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        AccountModule,
        EmailModule,
        JWTModule,
        PassportModule.register({defaultStrategy: StrategyConstant.jwt})
    ],
    controllers: [AuthWebControllerBase, AuthWebControllerExtension, AuthAdminController],
    providers: [
        {
            provide: IAuthWebService,
            useClass: AuthWebService,
        },
        {
            provide: IAuthAdminService,
            useClass: AuthAdminService,
        },
        {
            provide: ITokenService,
            useClass: TokenService,
        },
        {
            provide: IOTPService,
            useClass: OTPService,
        },
        {
            provide: IHashService,
            useClass: HashService,
        },
        JwtStrategy,
        JwtAuthGuard,
    ]
})  
export class AuthModule {}