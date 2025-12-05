import { Body } from "@nestjs/common";

import { IAuthWebService } from "@Modules/auth/behavior";
import { Account, AuthWebController, PostMethod, WebController } from "@Package/api";
import { LoginResponseDto, SignUpWebResponseDto, VerifyOTPResponseDto } from "../dto/response";
import { ForgotPasswordRequestDto, LoginRequestDto, ResetPasswordRequestDto, VerifyOTPRequestDto } from "../dto/request";
import { SignUpWebRequestDto } from "../dto/request";
import { AccountPayload } from "@Package/auth";

@WebController({
    prefix: 'auth',
})
export class AuthWebControllerBase {
    constructor(
        private readonly authWebService: IAuthWebService
    ) {}

    @PostMethod({
        path: "login",
        responseType: LoginResponseDto
    })
    async login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        return this.authWebService.login(loginRequestDto);
    }

    @PostMethod({
        path: "sign-up",
        responseType: SignUpWebResponseDto
    })
    async signUp(@Body() signUpWebRequestDto: SignUpWebRequestDto): Promise<SignUpWebResponseDto> {
        return this.authWebService.signUp(signUpWebRequestDto);
    }   

    @PostMethod({
        path: "forgot-password",
        responseType: null
    })
    async forgotPassword(@Body() forgotPasswordRequestDto: ForgotPasswordRequestDto): Promise<void> {
        return this.authWebService.forgotPassword(forgotPasswordRequestDto);
    }

}


@AuthWebController({
    prefix: 'auth',
})
export class AuthWebControllerExtension {
    constructor(
        private readonly authWebService: IAuthWebService
    ) {}

    @PostMethod({
        path: "verify-otp",
        responseType: VerifyOTPResponseDto
    })
    async verifyOTP(@Body() verifyOTPRequestDto: VerifyOTPRequestDto, @Account() account: AccountPayload): Promise<VerifyOTPResponseDto> {
        return this.authWebService.verifyOTP(verifyOTPRequestDto, account);
    }

    @PostMethod({
        path: "resend-otp",
        responseType: null
    })
    async resendOTP(@Account() account: AccountPayload): Promise<void> {
        return this.authWebService.resendOTP(account.email);
    }

    @PostMethod({
        path: "reset-password",
        responseType: null
    })
    async resetPassword(@Body() resetPasswordRequestDto: ResetPasswordRequestDto, @Account() account: AccountPayload): Promise<void> {
        return this.authWebService.resetPassword(resetPasswordRequestDto, account);
    }

    @PostMethod({
        path: "logout",
        responseType: null
    })
    async logout(@Account() account: AccountPayload): Promise<void> {
        return this.authWebService.logout(account);
    }
}