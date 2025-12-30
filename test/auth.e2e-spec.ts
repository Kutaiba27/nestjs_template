import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { IAccountService } from '@Modules/account';
import { ICacheService } from '@Infrastructure/cache';
import { ITokenService, IOTPService, IAuthWebService } from '@Modules/auth/behavior';
import { IHashService } from '@Package/auth';
import {
    createMockAccountService,
    createMockCacheService,
    createMockTokenService,
    createMockOTPService,
    createMockHashService,
} from './mocks/services.mock';
import { createMockAccount, generateTestToken } from './utils/test-helpers';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let accountService: jest.Mocked<IAccountService>;
    let cacheService: jest.Mocked<ICacheService>;
    let tokenService: jest.Mocked<ITokenService>;
    let otpService: jest.Mocked<IOTPService>;
    let hashService: jest.Mocked<IHashService>;

    beforeAll(async () => {
        const mockAccountService = createMockAccountService();
        const mockCacheService = createMockCacheService();
        const mockTokenService = createMockTokenService();
        const mockOTPService = createMockOTPService();
        const mockHashService = createMockHashService();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(IAccountService)
            .useValue(mockAccountService)
            .overrideProvider(ICacheService)
            .useValue(mockCacheService)
            .overrideProvider(ITokenService)
            .useValue(mockTokenService)
            .overrideProvider(IOTPService)
            .useValue(mockOTPService)
            .overrideProvider(IHashService)
            .useValue(mockHashService)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        app.setGlobalPrefix('api');
        app.enableVersioning({ type: 0, defaultVersion: '1', prefix: 'v' }); // URI versioning

        await app.init();

        accountService = moduleFixture.get(IAccountService);
        cacheService = moduleFixture.get(ICacheService);
        tokenService = moduleFixture.get(ITokenService);
        otpService = moduleFixture.get(IOTPService);
        hashService = moduleFixture.get(IHashService);
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/v1/web/auth/login', () => {
        const loginUrl = '/api/v1/web/auth/login';

        it('should successfully login with valid credentials', async () => {
            const account = createMockAccount({ isVerified: true });
            const token = generateTestToken();

            accountService.findByEmail.mockResolvedValue(account);
            hashService.comparePassword.mockResolvedValue(true);
            tokenService.buildPayload.mockReturnValue({
                id: account.id,
                email: account.email,
                accountRole: account.accountRole,
                isVerified: true,
                isActive: true,
            });
            tokenService.generateAndCache.mockResolvedValue(token);

            const response = await request(app.getHttpServer())
                .post(loginUrl)
                .send({
                    email: 'test@example.com',
                    password: 'Password123',
                })
                .expect(201);

            expect(response.body.data).toHaveProperty('token');
            expect(response.body.data).toHaveProperty('fullName');
            expect(response.body.data).toHaveProperty('accountRole');
        });

        it('should return error for invalid credentials', async () => {
            accountService.findByEmail.mockResolvedValue(null);

            await request(app.getHttpServer())
                .post(loginUrl)
                .send({
                    email: 'invalid@example.com',
                    password: 'WrongPassword123',
                })
                .expect(400);
        });

        it('should return validation error for invalid email format', async () => {
            await request(app.getHttpServer())
                .post(loginUrl)
                .send({
                    email: 'invalid-email',
                    password: 'Password123',
                })
                .expect(400);
        });
    });

    describe('POST /api/v1/web/auth/sign-up', () => {
        const signUpUrl = '/api/v1/web/auth/sign-up';

        it('should successfully create a new account', async () => {
            const account = createMockAccount();
            const token = generateTestToken();

            accountService.findByEmail.mockResolvedValue(null);
            accountService.create.mockResolvedValue(account);
            tokenService.buildPayload.mockReturnValue({
                id: account.id,
                email: account.email,
                accountRole: account.accountRole,
                isVerified: false,
                isActive: true,
            });
            tokenService.generateAndCache.mockResolvedValue(token);
            otpService.store.mockResolvedValue('123456');

            const response = await request(app.getHttpServer())
                .post(signUpUrl)
                .send({
                    email: 'newuser@example.com',
                    password: 'Password123',
                    firstName: 'New',
                    lastName: 'User',
                })
                .expect(201);

            expect(response.body.data).toHaveProperty('token');
            expect(response.body.data).toHaveProperty('fullName');
        });

        it('should return error for duplicate email', async () => {
            const existingAccount = createMockAccount();
            accountService.findByEmail.mockResolvedValue(existingAccount);

            await request(app.getHttpServer())
                .post(signUpUrl)
                .send({
                    email: 'existing@example.com',
                    password: 'Password123',
                    firstName: 'Test',
                    lastName: 'User',
                })
                .expect(400);
        });
    });

    describe('POST /api/v1/web/auth/forgot-password', () => {
        const forgotPasswordUrl = '/api/v1/web/auth/forgot-password';

        it('should send forgot password email', async () => {
            const account = createMockAccount();
            accountService.findByEmail.mockResolvedValue(account);

            await request(app.getHttpServer())
                .post(forgotPasswordUrl)
                .send({
                    email: 'test@example.com',
                })
                .expect(201);
        });
    });
});
