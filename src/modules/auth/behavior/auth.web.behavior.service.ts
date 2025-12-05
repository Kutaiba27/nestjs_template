import { LoginRequestDto } from "../api/dto/request/login.dto";
import { LoginResponseDto } from "../api/dto/response/login.dto";
import { SignUpWebRequestDto } from "../api/dto/request/sign-up-web.dto";
import { SignUpWebResponseDto, VerifyOTPResponseDto } from "../api/dto/response";
import { VerifyOTPRequestDto } from "../api/dto/request/verify-otp.dto";
import { AccountPayload } from "@Package/auth";
import { ForgotPasswordRequestDto } from "../api/dto/request/forgot-password-request.dto";
import { ResetPasswordRequestDto } from "../api/dto/request";

export abstract class   IAuthWebService {
    abstract login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto>;
    abstract signUp(signUpWebRequestDto: SignUpWebRequestDto): Promise<SignUpWebResponseDto>;
    abstract verifyOTP(verifyOTPRequestDto: VerifyOTPRequestDto, account: AccountPayload): Promise<VerifyOTPResponseDto>;
    abstract resendOTP(email: string): Promise<void>;
    abstract resetPassword(forgotPasswordRequestDto: ResetPasswordRequestDto, account: AccountPayload): Promise<void>;
    abstract forgotPassword(forgotPasswordRequestDto: ForgotPasswordRequestDto): Promise<void>;
    abstract logout(account: AccountPayload): Promise<void>;
}