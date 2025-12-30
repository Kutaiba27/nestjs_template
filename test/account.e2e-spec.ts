import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { IAccountService, IAccountWebService } from '@Modules/account/behavior';
import { JwtService } from '@nestjs/jwt';
import {
    createMockAccountService,
} from './mocks/services.mock';
import { createMockAccount, createMockAccountPayload, generateTestToken } from './utils/test-helpers';
import { AccountRole } from '@Modules/account';

describe('Account (e2e)', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let accountWebService: jest.Mocked<IAccountWebService>;

    const createAuthToken = (payload = createMockAccountPayload()): string => {
        return jwtService.sign(payload);
    };

    beforeAll(async () => {
        const mockAccountWebService = {
            findOne: jest.fn(),
            update: jest.fn(),
            changePassword: jest.fn(),
        };

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(IAccountWebService)
            .useValue(mockAccountWebService)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        app.setGlobalPrefix('api');
        app.enableVersioning({ type: 0, defaultVersion: '1', prefix: 'v' });

        await app.init();

        jwtService = moduleFixture.get(JwtService);
        accountWebService = moduleFixture.get(IAccountWebService);
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/v1/web/account/profile', () => {
        const profileUrl = '/api/v1/web/account/profile';

        it('should return user profile when authenticated', async () => {
            const account = createMockAccount({ isVerified: true });
            const token = createAuthToken({ ...createMockAccountPayload(), isVerified: true });

            accountWebService.findOne.mockResolvedValue(account);

            const response = await request(app.getHttpServer())
                .get(profileUrl)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body.data).toHaveProperty('email');
            expect(response.body.data).toHaveProperty('firstName');
            expect(response.body.data).toHaveProperty('lastName');
        });

        it('should return 401 when not authenticated', async () => {
            await request(app.getHttpServer())
                .get(profileUrl)
                .expect(401);
        });

        it('should return 401 when token is invalid', async () => {
            await request(app.getHttpServer())
                .get(profileUrl)
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);
        });
    });

    describe('PUT /api/v1/web/account/profile', () => {
        const profileUrl = '/api/v1/web/account/profile';

        it('should update user profile', async () => {
            const token = createAuthToken();
            accountWebService.update.mockResolvedValue(undefined);

            await request(app.getHttpServer())
                .put(profileUrl)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstName: 'Updated',
                    lastName: 'Name',
                })
                .expect(200);

            expect(accountWebService.update).toHaveBeenCalled();
        });

        it('should return 401 when not authenticated', async () => {
            await request(app.getHttpServer())
                .put(profileUrl)
                .send({
                    firstName: 'Updated',
                    lastName: 'Name',
                })
                .expect(401);
        });
    });

    describe('PUT /api/v1/web/account/change-password', () => {
        const changePasswordUrl = '/api/v1/web/account/change-password';

        it('should change user password', async () => {
            const token = createAuthToken();
            accountWebService.changePassword.mockResolvedValue(undefined);

            await request(app.getHttpServer())
                .put(changePasswordUrl)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    newPassword: 'NewPassword123',
                })
                .expect(200);

            expect(accountWebService.changePassword).toHaveBeenCalled();
        });

        it('should return 401 when not authenticated', async () => {
            await request(app.getHttpServer())
                .put(changePasswordUrl)
                .send({
                    newPassword: 'NewPassword123',
                })
                .expect(401);
        });
    });
});
