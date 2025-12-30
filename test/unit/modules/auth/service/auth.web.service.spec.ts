import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebService } from '@Modules/auth/service/auth.web.service';
import { JwtService } from '@nestjs/jwt';
import { getConnectionToken } from '@nestjs/mongoose';
import { IAccountService } from '@Modules/account';
import { ICacheService } from '@Infrastructure/cache';
import { EnvironmentService } from '@Infrastructure/config';
import { EmailQueueService } from '@Modules/email/services/email-queue.service';
import { ITokenService, IOTPService } from '@Modules/auth/behavior';
import { IHashService } from '@Package/auth';
import {
    createMockAccountService,
    createMockCacheService,
    createMockTokenService,
    createMockOTPService,
    createMockHashService,
    createMockEmailQueueService,
    createMockJwtService,
    createMockEnvironmentService,
    createMockConnection,
} from '../../../../mocks/services.mock';
import {
    createMockAccount,
    createMockAccountPayload,
    createMockLoginDto,
    createMockSignUpDto,
    createMockVerifyOtpDto,
    generateTestToken,
} from '../../../../utils/test-helpers';

describe('AuthWebService', () => {
    let service: AuthWebService;
    let accountService: jest.Mocked<IAccountService>;
    let cacheService: jest.Mocked<ICacheService>;
    let tokenService: jest.Mocked<ITokenService>;
    let otpService: jest.Mocked<IOTPService>;
    let hashService: jest.Mocked<IHashService>;
    let emailQueueService: jest.Mocked<EmailQueueService>;
    let jwtService: jest.Mocked<JwtService>;

    beforeEach(async () => {
        const mockAccountService = createMockAccountService();
        const mockCacheService = createMockCacheService();
        const mockTokenService = createMockTokenService();
        const mockOTPService = createMockOTPService();
        const mockHashService = createMockHashService();
        const mockEmailQueueService = createMockEmailQueueService();
        const mockJwtService = createMockJwtService();
        const mockEnvironmentService = createMockEnvironmentService();
        const mockConnection = createMockConnection();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthWebService,
                { provide: IAccountService, useValue: mockAccountService },
                { provide: ICacheService, useValue: mockCacheService },
                { provide: JwtService, useValue: mockJwtService },
                { provide: EnvironmentService, useValue: mockEnvironmentService },
                { provide: EmailQueueService, useValue: mockEmailQueueService },
                { provide: ITokenService, useValue: mockTokenService },
                { provide: IOTPService, useValue: mockOTPService },
                { provide: IHashService, useValue: mockHashService },
                { provide: getConnectionToken(), useValue: mockConnection },
            ],
        }).compile();

        service = module.get<AuthWebService>(AuthWebService);
        accountService = module.get(IAccountService);
        cacheService = module.get(ICacheService);
        tokenService = module.get(ITokenService);
        otpService = module.get(IOTPService);
        hashService = module.get(IHashService);
        emailQueueService = module.get(EmailQueueService);
        jwtService = module.get(JwtService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should successfully login with valid credentials', async () => {
            const loginDto = createMockLoginDto();
            const account = createMockAccount({ isVerified: true });
            const payload = createMockAccountPayload({ isVerified: true });
            const token = generateTestToken();

            accountService.findByEmail.mockResolvedValue(account as any);
            hashService.comparePassword.mockResolvedValue(true);
            tokenService.buildPayload.mockReturnValue(payload as any);
            tokenService.generateAndCache.mockResolvedValue(token);

            const result = await service.login(loginDto);

            expect(result).toEqual({
                token,
                fullName: `${account.firstName} ${account.lastName}`,
                accountRole: account.accountRole,
                isVerified: true,
            });
            expect(accountService.findByEmail).toHaveBeenCalledWith(loginDto.email);
            expect(hashService.comparePassword).toHaveBeenCalledWith(loginDto.password, account.password);
        });

        it('should throw error when account not found', async () => {
            const loginDto = createMockLoginDto();
            accountService.findByEmail.mockResolvedValue(null as any);

            await expect(service.login(loginDto)).rejects.toThrow();
            expect(accountService.findByEmail).toHaveBeenCalledWith(loginDto.email);
        });

        it('should throw error when password is invalid', async () => {
            const loginDto = createMockLoginDto();
            const account = createMockAccount();
            
            accountService.findByEmail.mockResolvedValue(account as any);
            hashService.comparePassword.mockResolvedValue(false);

            await expect(service.login(loginDto)).rejects.toThrow();
        });
    });

    describe('signUp', () => {
        it('should successfully create a new account', async () => {
            const signUpDto = createMockSignUpDto();
            const account = createMockAccount();
            const payload = createMockAccountPayload();
            const token = generateTestToken();
            const otp = '123456';

            accountService.findByEmail.mockResolvedValue(null as any);
            accountService.create.mockResolvedValue(account as any);
            tokenService.buildPayload.mockReturnValue(payload as any);
            tokenService.generateAndCache.mockResolvedValue(token);
            otpService.store.mockResolvedValue(otp);

            const result = await service.signUp(signUpDto);

            expect(result).toEqual({
                token,
                fullName: `${account.firstName} ${account.lastName}`,
                accountRole: account.accountRole,
                isVerified: false,
            });
            expect(emailQueueService.sendSignUpEmail).toHaveBeenCalledWith(account.email, otp);
        });

        it('should throw error when email already exists', async () => {
            const signUpDto = createMockSignUpDto();
            const existingAccount = createMockAccount();

            accountService.findByEmail.mockResolvedValue(existingAccount as any);

            await expect(service.signUp(signUpDto)).rejects.toThrow();
        });
    });

    describe('verifyOTP', () => {
        it('should successfully verify OTP', async () => {
            const verifyDto = createMockVerifyOtpDto();
            const payload = createMockAccountPayload();
            const token = generateTestToken();

            otpService.get.mockResolvedValue('123456');
            otpService.verify.mockResolvedValue(true);
            tokenService.generateAndCache.mockResolvedValue(token);

            const result = await service.verifyOTP(verifyDto, payload as any);

            expect(result).toEqual({ token });
            expect(accountService.update).toHaveBeenCalledWith(payload.id, { isVerified: true });
            expect(otpService.delete).toHaveBeenCalledWith(payload.email);
        });

        it('should throw error when OTP is expired', async () => {
            const verifyDto = createMockVerifyOtpDto();
            const payload = createMockAccountPayload();

            otpService.get.mockResolvedValue(null);

            await expect(service.verifyOTP(verifyDto, payload as any)).rejects.toThrow();
        });

        it('should throw error when OTP is invalid', async () => {
            const verifyDto = createMockVerifyOtpDto({ otp: 'wrong-otp' });
            const payload = createMockAccountPayload();

            otpService.get.mockResolvedValue('123456');
            otpService.verify.mockResolvedValue(false);

            await expect(service.verifyOTP(verifyDto, payload as any)).rejects.toThrow();
        });
    });

    describe('resendOTP', () => {
        it('should successfully resend OTP', async () => {
            const email = 'test@example.com';
            const account = createMockAccount({ isVerified: false });
            const otp = '123456';

            accountService.findByEmail.mockResolvedValue(account as any);
            otpService.store.mockResolvedValue(otp);

            await service.resendOTP(email);

            expect(otpService.store).toHaveBeenCalledWith(email);
            expect(emailQueueService.sendSignUpEmail).toHaveBeenCalledWith(email, otp);
        });

        it('should throw error when account is already verified', async () => {
            const email = 'test@example.com';
            const account = createMockAccount({ isVerified: true });

            accountService.findByEmail.mockResolvedValue(account as any);

            await expect(service.resendOTP(email)).rejects.toThrow();
        });
    });

    describe('logout', () => {
        it('should successfully logout user', async () => {
            const payload = createMockAccountPayload();

            await service.logout(payload as any);

            expect(tokenService.invalidate).toHaveBeenCalledWith(payload.id);
        });
    });

    describe('forgotPassword', () => {
        it('should send forgot password email', async () => {
            const email = 'test@example.com';
            const account = createMockAccount();

            accountService.findByEmail.mockResolvedValue(account as any);

            await service.forgotPassword({ email });

            expect(cacheService.set).toHaveBeenCalled();
            expect(emailQueueService.sendForgotPasswordEmail).toHaveBeenCalled();
        });
    });

    describe('resetPassword', () => {
        it('should successfully reset password', async () => {
            const payload = createMockAccountPayload({ resetPasswordToken: true });
            const token = 'valid-token';

            cacheService.get.mockResolvedValue(token);
            jwtService.verify.mockReturnValue({ email: payload.email, resetPasswordToken: true });

            await service.resetPassword({ password: 'NewPassword123' }, payload as any);

            expect(accountService.update).toHaveBeenCalledWith(payload.id, { password: 'NewPassword123' });
            expect(cacheService.delete).toHaveBeenCalled();
        });

        it('should throw error when reset token is invalid', async () => {
            const payload = createMockAccountPayload({ resetPasswordToken: false });

            await expect(service.resetPassword({ password: 'NewPassword123' }, payload as any)).rejects.toThrow();
        });

        it('should throw error when token is expired', async () => {
            const payload = createMockAccountPayload({ resetPasswordToken: true });

            cacheService.get.mockResolvedValue(null);

            await expect(service.resetPassword({ password: 'NewPassword123' }, payload as any)).rejects.toThrow();
        });
    });
});
