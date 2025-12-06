import { IAccountService } from "@Modules/account/behavior"
import { Injectable } from "@nestjs/common"
import { ErrorServiceFactory } from "@Package/error"
import { IAuthAdminService, ITokenService } from "../behavior"
import { AdminErrorCode, ClientSideErrorCode } from "@Common/error"
import { LoginResponseDto } from "../api/dto/response"
import { LoginRequestDto } from "../api/dto/request"
import { AccountPayload, IHashService } from "@Package/auth"
import { AccountRole } from "@Modules/account"

@Injectable()
export class AuthAdminService implements IAuthAdminService {
    private readonly AuthAdminServiceError = ErrorServiceFactory.createErrorService(AuthAdminService.name)
    
    constructor(
        private readonly accountService: IAccountService,
        private readonly tokenService: ITokenService,
        private readonly hashService: IHashService,
    ) {}

    async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        const account = await this.accountService.findByEmail(loginRequestDto.email)
        if (!account) this.AuthAdminServiceError.throw(AdminErrorCode.AUTH.INVALID_CREDENTIALS)
        if(account.accountRole !== AccountRole.ADMIN) this.AuthAdminServiceError.throw(AdminErrorCode.AUTH.NOT_ADMIN)
        
        const isPasswordValid = await this.hashService.comparePassword(loginRequestDto.password, account.password ?? '')
        if (!isPasswordValid) this.AuthAdminServiceError.throw(ClientSideErrorCode.AUTH.INVALID_CREDENTIALS)
        
        const tokenPayload = this.tokenService.buildPayload(account);
        const token = await this.tokenService.generateAndCache(tokenPayload);
        
        return {
            token,
            fullName: `${account.firstName} ${account.lastName}`,
            accountRole: account.accountRole,
            isVerified: account.isVerified ?? false,
        };
    }

    async logout(account: AccountPayload): Promise<void> {
        await this.tokenService.invalidate(account.id);
    }
}