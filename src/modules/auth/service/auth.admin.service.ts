import { IAccountService } from "@Modules/account/behavior"
import { Injectable } from "@nestjs/common"
import { ErrorServiceFactory } from "@Package/error"
import { IAuthAdminService } from "../behavior"
import { ICacheService } from "@Infrastructure/cache"
import { JwtService } from "@nestjs/jwt"
import { InjectConnection } from "@nestjs/mongoose"
import { Connection } from "mongoose"
import { EnvironmentService } from "@Infrastructure/config"
import { AdminErrorCode, ClientSideErrorCode } from "@Common/error"
import { LoginResponseDto } from "../api/dto/response"
import { LoginRequestDto } from "../api/dto/request"
import { AccountPayload, HashService } from "@Package/auth"
import { AccountRole } from "@Modules/account"

@Injectable()
export class AuthAdminService implements IAuthAdminService {
    private readonly AuthAdminServiceError = ErrorServiceFactory.createErrorService(AuthAdminService.name)
    constructor(
        private readonly accountService: IAccountService,
        private readonly cacheService: ICacheService,
        private readonly jwtService: JwtService,
        private readonly environmentService: EnvironmentService,
    ) {}
    async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        const account = await this.accountService.findByEmail(loginRequestDto.email)
        if (!account) this.AuthAdminServiceError.throw(AdminErrorCode.AUTH.INVALID_CREDENTIALS)
        if(account.accountRole !== AccountRole.ADMIN) this.AuthAdminServiceError.throw(AdminErrorCode.AUTH.NOT_ADMIN)
        const isPasswordValid = await HashService.comparePassword(loginRequestDto.password, account.password ?? '')
        if (!isPasswordValid)  this.AuthAdminServiceError.throw(ClientSideErrorCode.AUTH.INVALID_CREDENTIALS)
        
        const tokenPayload: AccountPayload = {
            id: account.id,
            email: account.email,
            accountRole: account.accountRole,
            isVerified: account.isVerified ?? false,
            isActive: account.isActive ?? true
        }
        const token = this.jwtService.sign<AccountPayload>(tokenPayload, {
            expiresIn: this.environmentService.get("jwt.jwtExpiredAccess") as any
        });
        await this.cacheService.set({
            key: `${account.id}`,
            value: token,
            ttl: 10000 * 60 * 5 
        });
        return {
            token: token,
            fullName: `${account.firstName} ${account.lastName}`,
            accountRole: account.accountRole,
            isVerified: account.isVerified ?? false,
        };
    }

    async logout(account: AccountPayload): Promise<void> {
        await this.cacheService.delete([`${account.id}`]);
    }
}