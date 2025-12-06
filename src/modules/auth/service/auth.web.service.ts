import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { Connection } from "mongoose";

import { AccountRole, IAccountService } from "@Modules/account";
import { IAuthWebService, ITokenService, IOTPService } from "../behavior";
import { LoginResponseDto, SignUpWebResponseDto, VerifyOTPResponseDto } from "../api/dto/response";
import { ForgotPasswordRequestDto, LoginRequestDto, ResetPasswordRequestDto, SignUpWebRequestDto, VerifyOTPRequestDto } from "../api/dto/request";
import { ErrorServiceFactory } from "@Package/error";
import { ClientSideErrorCode } from "@Common/error";
import { AccountPayload, IHashService } from "@Package/auth";
import { ICacheService } from "@Infrastructure/cache";
import { EnvironmentService } from "@Infrastructure/config";
import { EmailQueueService } from "@Modules/email/services/email-queue.service";
import { InjectConnection } from "@nestjs/mongoose";
import { RedisKeys, RedisTTL } from "@Common/cache";

@Injectable()
export class AuthWebService implements IAuthWebService {
    private readonly AuthWebServiceError = ErrorServiceFactory.createErrorService(AuthWebService.name)
    
    constructor(
        private readonly accountService: IAccountService,
        private readonly cacheService: ICacheService,
        private readonly jwtService: JwtService,
        private readonly environmentService: EnvironmentService,
        private readonly emailQueueService: EmailQueueService,
        private readonly tokenService: ITokenService,
        private readonly otpService: IOTPService,
        private readonly hashService: IHashService,
        @InjectConnection() private readonly connection: Connection
    ) {}

    async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        const account = await this.accountService.findByEmail(loginRequestDto.email)
        if (!account) {
            throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_CREDENTIALS)
        }

        const isPasswordValid = await this.hashService.comparePassword(loginRequestDto.password, account.password ?? '')
        if (!isPasswordValid) {
            throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_CREDENTIALS)
        }
        
        const tokenPayload = this.tokenService.buildPayload(account);
        const token = await this.tokenService.generateAndCache(tokenPayload);
        
        return {
            token,
            fullName: `${account.firstName} ${account.lastName}`,
            accountRole: account.accountRole,
            isVerified: account.isVerified ?? false,
        };
    }

    async signUp(signUpWebRequestDto: SignUpWebRequestDto): Promise<SignUpWebResponseDto> {
        const isEmailExists = await this.accountService.findByEmail(signUpWebRequestDto.email, false)
        if (isEmailExists) {
            throw this.AuthWebServiceError.error(ClientSideErrorCode.ACCOUNT.DUPLICATED_EMAIL)
        }
        const session = await this.connection.startSession()
        try {
            session.startTransaction()
            const accountData = {
                email: signUpWebRequestDto.email,
                password: signUpWebRequestDto.password,
                firstName: signUpWebRequestDto.firstName,
                lastName: signUpWebRequestDto.lastName,
                accountRole: AccountRole.USER,
            }

            const account = await this.accountService.create(accountData, {session});
            const tokenPayload = this.tokenService.buildPayload(account, { isVerified: false, isActive: true });
            const token = await this.tokenService.generateAndCache(tokenPayload);
            
            const otp = await this.otpService.store(account.email);
            await this.emailQueueService.sendSignUpEmail(account.email, otp);
            await session.commitTransaction()
            return {
                token,
                fullName: `${account.firstName} ${account.lastName}`,
                accountRole: account.accountRole,
                isVerified: account.isVerified ?? false,
            };
        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    }

    async verifyOTP(verifyOTPRequestDto: VerifyOTPRequestDto, accountPayload: AccountPayload): Promise<VerifyOTPResponseDto> {
        const storedOtp = await this.otpService.get(accountPayload.email);
        if (!storedOtp) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.EXPIRED_OTP_TOKEN)
        
        const isValid = await this.otpService.verify(accountPayload.email, verifyOTPRequestDto.otp);
        if (!isValid) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_OTP)
        
        await this.accountService.update(accountPayload.id, { isVerified: true })
        await this.otpService.delete(accountPayload.email);
        
        const newTokenPayload: AccountPayload = {
            ...accountPayload,
            isVerified: true,
            isActive: true
        };
        const token = await this.tokenService.generateAndCache(newTokenPayload);
        
        return { token };
    }

    async resendOTP(email: string): Promise<void> {
        const account = await this.accountService.findByEmail(email)
        if(account.isVerified) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.ACCOUNT_ALREADY_VERIFIED)
        const otp = await this.otpService.store(email);
        await this.emailQueueService.sendSignUpEmail(email, otp);
    }

    async forgotPassword(forgotPasswordRequestDto: ForgotPasswordRequestDto): Promise<void> {
        const account = await this.accountService.findByEmail(forgotPasswordRequestDto.email)
        const token = this.jwtService.sign({
            id: account.id,
            email: forgotPasswordRequestDto.email,
            resetPasswordToken: true
        }, {
            expiresIn: "15m"
        })
        const url = `${this.environmentService.get("app.frontendUrl")}/reset-password?email=${forgotPasswordRequestDto.email}`
        await this.cacheService.set({
            key: `${RedisKeys.FORGOT_PASSWORD}:${forgotPasswordRequestDto.email}`,
            value: token,
            ttl: RedisTTL.FORGOT_PASSWORD
        }) 
        await this.emailQueueService.sendForgotPasswordEmail(forgotPasswordRequestDto.email, url);
    }

    async resetPassword(resetPasswordRequestDto: ResetPasswordRequestDto, account: AccountPayload): Promise<void> {
        if(!account.resetPasswordToken) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_FORGOT_PASSWORD_TOKEN)
        const token = await this.cacheService.get<string>(`${RedisKeys.FORGOT_PASSWORD}:${account.email}`)
        if (!token) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.EXPIRED_FORGOT_PASSWORD_TOKEN)
        const decoded = this.jwtService.verify<{email: string, resetPasswordToken: boolean}>(token)
        if (decoded.email !== account.email) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_FORGOT_PASSWORD_TOKEN)
        if (!decoded.resetPasswordToken) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_FORGOT_PASSWORD_TOKEN)
        await this.accountService.update(account.id, { password: resetPasswordRequestDto.password })
        await this.cacheService.delete([`${RedisKeys.FORGOT_PASSWORD}:${account.email}`])
    }

    async logout(account: AccountPayload): Promise<void> {
        await this.tokenService.invalidate(account.id);
    }
}