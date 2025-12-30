import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '@Modules/auth/service/token.service';
import { JwtService } from '@nestjs/jwt';
import { ICacheService } from '@Infrastructure/cache';
import { EnvironmentService } from '@Infrastructure/config';
import { createMockAccount, createMockAccountPayload, TestAccountRole } from '../../../../utils/test-helpers';
import { 
    createMockJwtService, 
    createMockCacheService, 
    createMockEnvironmentService 
} from '../../../../mocks/services.mock';

describe('TokenService', () => {
    let service: TokenService;
    let jwtService: jest.Mocked<JwtService>;
    let cacheService: jest.Mocked<ICacheService>;
    let environmentService: jest.Mocked<EnvironmentService>;

    beforeEach(async () => {
        const mockJwtService = createMockJwtService();
        const mockCacheService = createMockCacheService();
        const mockEnvironmentService = createMockEnvironmentService();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TokenService,
                { provide: JwtService, useValue: mockJwtService },
                { provide: ICacheService, useValue: mockCacheService },
                { provide: EnvironmentService, useValue: mockEnvironmentService },
            ],
        }).compile();

        service = module.get<TokenService>(TokenService);
        jwtService = module.get(JwtService);
        cacheService = module.get(ICacheService);
        environmentService = module.get(EnvironmentService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateAndCache', () => {
        it('should generate a JWT token and cache it', async () => {
            const payload = createMockAccountPayload();
            const expectedToken = 'test-jwt-token';
            jwtService.sign.mockReturnValue(expectedToken);

            const result = await service.generateAndCache(payload as any);

            expect(result).toBe(expectedToken);
            expect(jwtService.sign).toHaveBeenCalledWith(
                expect.objectContaining({ id: payload.id }),
                expect.objectContaining({ expiresIn: expect.any(String) })
            );
            expect(cacheService.set).toHaveBeenCalledWith({
                key: payload.id,
                value: expectedToken,
                ttl: expect.any(Number),
            });
        });
    });

    describe('buildPayload', () => {
        it('should build payload from account entity', () => {
            const account = createMockAccount();

            const result = service.buildPayload(account as any);

            expect(result).toEqual({
                id: account.id,
                email: account.email,
                accountRole: account.accountRole,
                isVerified: account.isVerified,
                isActive: account.isActive,
            });
        });

        it('should apply overrides to payload', () => {
            const account = createMockAccount({ isVerified: false });
            const overrides = { isVerified: true };

            const result = service.buildPayload(account as any, overrides);

            expect(result.isVerified).toBe(true);
        });

        it('should use default values for undefined fields', () => {
            const account = createMockAccount({ isVerified: undefined, isActive: undefined });

            const result = service.buildPayload(account as any);

            expect(result.isVerified).toBe(false);
            expect(result.isActive).toBe(true);
        });
    });

    describe('invalidate', () => {
        it('should remove token from cache', async () => {
            const userId = 'test-user-id';

            await service.invalidate(userId);

            expect(cacheService.delete).toHaveBeenCalledWith([userId]);
        });
    });
});
