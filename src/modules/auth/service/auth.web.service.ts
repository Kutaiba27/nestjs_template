import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { Connection } from "mongoose";

import { AccountRole, IAccountService } from "@Modules/account";
import { IAuthWebService } from "../behavior";
import { LoginResponseDto, SignUpWebResponseDto, VerifyOTPResponseDto } from "../api/dto/response";
import { ForgotPasswordRequestDto, LoginRequestDto, ResetPasswordRequestDto, SignUpWebRequestDto, VerifyOTPRequestDto } from "../api/dto/request";
import { ErrorServiceFactory } from "@Package/error";
import { ClientSideErrorCode } from "@Common/error";
import { AccountPayload, HashService } from "@Package/auth";
import { ICacheService } from "@Infrastructure/cache";
import { EnvironmentService } from "@Infrastructure/config";
import { EmailQueueService } from "@Modules/email/services/email-queue.service";
import { InjectConnection } from "@nestjs/mongoose";
import { generateOTP } from "@Package/utilities";
import { RedisKeys } from "@Common/cache/redis-key.constant";

@Injectable()
export class AuthWebService implements IAuthWebService {
    private readonly AuthWebServiceError = ErrorServiceFactory.createErrorService(AuthWebService.name)
    constructor(
        private readonly accountService: IAccountService,
        private readonly cacheService: ICacheService,
        private readonly jwtService: JwtService,
        private readonly environmentService: EnvironmentService,
        private readonly emailQueueService: EmailQueueService,
        @InjectConnection() private readonly connection: Connection
    ) {}
    async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        const account = await this.accountService.findByEmail(loginRequestDto.email)
        if (!account) {
            throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_CREDENTIALS)
        }

        const isPasswordValid = await HashService.comparePassword(loginRequestDto.password, account.password)
        if (!isPasswordValid) {
            throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_CREDENTIALS)
        }
        const tokenPayload: AccountPayload = {
            id: account.id,
            email: account.email,
            accountRole: account.accountRole,
            isVerified: account.isVerified,
            isActive: account.isActive
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
            isVerified: account.isVerified,
        };
    }

    async signUp(signUpWebRequestDto: SignUpWebRequestDto): Promise<SignUpWebResponseDto> {
        const isEmailExists = await this.accountService.findByEmail(signUpWebRequestDto.email, false)
        if (isEmailExists) {
            throw this.AuthWebServiceError.error(ClientSideErrorCode.ACCOUNT.DUPLICATED_EMAIL)
        }
        const session = await this.connection.startSession()
        session.startTransaction()
        const accountData = {
            email: signUpWebRequestDto.email,
            password: signUpWebRequestDto.password,
            firstName: signUpWebRequestDto.firstName,
            lastName: signUpWebRequestDto.lastName,
            accountRole: AccountRole.USER,
        }

        const account = await this.accountService.create(accountData, {session});
        const tokenPayload: AccountPayload = {
            id: account.id,
            email: account.email,
            accountRole: account.accountRole,
            isVerified: false,
            isActive: true
        };
        const token = this.jwtService.sign<AccountPayload>(tokenPayload, {
            expiresIn: this.environmentService.get("jwt.jwtExpiredAccess") as any
        });
        await this.cacheService.set({
            key: `${account.id}`,
            value: token,
            ttl: 10000 * 60 * 5 
        });
        const otp = generateOTP()
        this.cacheService.set({
            key: `${RedisKeys.OTP}:${account.email}`,
            value: otp,
            ttl: 10000 * 60 * 5 
        })
        await this.emailQueueService.sendSignUpEmail(account.email, otp);
        await session.commitTransaction()
        session.endSession()
        return {
            token: token,
            fullName: `${account.firstName} ${account.lastName}`,
            accountRole: account.accountRole,
            isVerified: account.isVerified,
        };
    }

    async verifyOTP(verifyOTPRequestDto: VerifyOTPRequestDto, AccountPayload: AccountPayload): Promise<VerifyOTPResponseDto> {
        const otp = await this.cacheService.get<string>(`${RedisKeys.OTP}:${AccountPayload.email}`)
        if (!otp) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.EXPIRED_OTP_TOKEN)
        if(otp.toString() !== verifyOTPRequestDto.otp) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.INVALID_OTP)
        await this.accountService.update(AccountPayload.id, { isVerified: true })
        await this.cacheService.delete([`${RedisKeys.OTP}:${AccountPayload.email}`])
        const newAccountTokenPayload: AccountPayload = {
            id: AccountPayload.id,
            email: AccountPayload.email,
            accountRole: AccountPayload.accountRole,
            isVerified: false,
            isActive: true
        };
        const newAccountToken = this.jwtService.sign<AccountPayload>(newAccountTokenPayload, {
            expiresIn: this.environmentService.get("jwt.jwtExpiredAccess") as any
        });
        await this.cacheService.set({
            key: `${AccountPayload.id}`,
            value: newAccountToken,
            ttl: 10000 * 60 * 5 
        });
        return {
            token: newAccountToken,
        };
    }

    async resendOTP(email: string): Promise<void> {
        const account = await this.accountService.findByEmail(email)
        if(account.isVerified) throw this.AuthWebServiceError.error(ClientSideErrorCode.AUTH.ACCOUNT_ALREADY_VERIFIED)
        const otp = generateOTP()
        await this.cacheService.set({
            key: `${RedisKeys.OTP}:${email}`,
            value: otp,
            ttl: 10000 * 60 * 5 
        })
        await this.emailQueueService.sendSignUpEmail(email, otp);
    }

    async forgotPassword(forgotPasswordRequestDto: ForgotPasswordRequestDto): Promise<void> {
        const account = await this.accountService.findByEmail(forgotPasswordRequestDto.email)
        const token = this.jwtService.sign<{id: string, email: string, resetPasswordToken: boolean}>({
            id: account.id,
            email: forgotPasswordRequestDto.email,
            resetPasswordToken: true
        }, {
            //TODO
            expiresIn: "15m"
        })
        const url = `${this.environmentService.get("app.frontendUrl")}/reset-password?email=${forgotPasswordRequestDto.email}`
        await this.cacheService.set({
            key: `${RedisKeys.FORGOT_PASSWORD}:${forgotPasswordRequestDto.email}`,
            value: token,
            ttl: 15 * 60 * 1000 // 15 minutes
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
        await this.cacheService.delete([`${account.id}`]);
    }
}