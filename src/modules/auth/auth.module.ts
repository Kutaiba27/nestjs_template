import { JwtAuthGuard, JWTModule, JwtStrategy, StrategyConstant } from "@Package/auth";
import { AuthWebService } from "./service/auth.web.service";
import { AccountModule } from "@Modules/account";
import { EmailModule } from "@Modules/email";
import { IAuthAdminService, IAuthWebService } from "./behavior";
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
            useClass: AuthWebService,
        },
        JwtStrategy,
        JwtAuthGuard,
    ]
})  
export class AuthModule {

}