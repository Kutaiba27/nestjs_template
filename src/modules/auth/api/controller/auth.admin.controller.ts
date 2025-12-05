import { Body, Controller } from "@nestjs/common";

import { IAuthAdminService } from "@Modules/auth/behavior";
import { Account, PostMethod } from "@Package/api";
import { LoginResponseDto } from "../dto/response";
import { LoginRequestDto } from "../dto/request";
import { ApiTags } from "@nestjs/swagger";
import { AccountPayload } from "@Package/auth";

@ApiTags('admin auth')
@Controller({
    path: 'auth',
})
export class AuthAdminController {
    constructor(
        private readonly authAdminService: IAuthAdminService
    ) {}

    @PostMethod({
        path: "login",
        responseType: LoginResponseDto
    })
    async login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        return this.authAdminService.login(loginRequestDto);
    }

    @PostMethod({
        path: "logout",
        responseType: null
    })
    async logout(@Account() account: AccountPayload): Promise<void> {
        return this.authAdminService.logout(account);
    }
}