import { Test, TestingModule } from '@nestjs/testing';
import { OTPService } from '@Modules/auth/service/otp.service';
import { ICacheService } from '@Infrastructure/cache';
import { createMockCacheService } from '../../../../mocks/services.mock';
import { RedisKeys, RedisTTL } from '@Common/cache';

describe('OTPService', () => {
    let service: OTPService;
    let cacheService: jest.Mocked<ICacheService>;

    beforeEach(async () => {
        const mockCacheService = createMockCacheService();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OTPService,
                { provide: ICacheService, useValue: mockCacheService },
            ],
        }).compile();

        service = module.get<OTPService>(OTPService);
        cacheService = module.get(ICacheService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generate', () => {
        it('should return a 5-digit OTP string', () => {
            const otp = service.generate();

            expect(otp).toBeDefined();
            expect(typeof otp).toBe('string');
            expect(otp.length).toBe(5);
            expect(/^\d{5}$/.test(otp)).toBe(true);
        });
    });

    describe('store', () => {
        it('should generate OTP and store it in cache', async () => {
            const email = 'test@example.com';

            const result = await service.store(email);

            expect(result).toBeDefined();
            expect(result.length).toBe(5);
            expect(cacheService.set).toHaveBeenCalledWith({
                key: `${RedisKeys.OTP}:${email}`,
                value: result,
                ttl: RedisTTL.OTP,
            });
        });
    });

    describe('get', () => {
        it('should retrieve OTP from cache', async () => {
            const email = 'test@example.com';
            const storedOtp = '123456';
            cacheService.get.mockResolvedValue(storedOtp);

            const result = await service.get(email);

            expect(result).toBe(storedOtp);
            expect(cacheService.get).toHaveBeenCalledWith(`${RedisKeys.OTP}:${email}`);
        });

        it('should return null if OTP not found', async () => {
            const email = 'test@example.com';
            cacheService.get.mockResolvedValue(null);

            const result = await service.get(email);

            expect(result).toBeNull();
        });
    });

    describe('verify', () => {
        it('should return true for valid OTP', async () => {
            const email = 'test@example.com';
            const otp = '123456';
            cacheService.get.mockResolvedValue(otp);

            const result = await service.verify(email, otp);

            expect(result).toBe(true);
        });

        it('should return false for invalid OTP', async () => {
            const email = 'test@example.com';
            cacheService.get.mockResolvedValue('123456');

            const result = await service.verify(email, '654321');

            expect(result).toBe(false);
        });

        it('should return false if OTP not found', async () => {
            const email = 'test@example.com';
            cacheService.get.mockResolvedValue(null);

            const result = await service.verify(email, '123456');

            expect(result).toBe(false);
        });
    });

    describe('delete', () => {
        it('should remove OTP from cache', async () => {
            const email = 'test@example.com';

            await service.delete(email);

            expect(cacheService.delete).toHaveBeenCalledWith([`${RedisKeys.OTP}:${email}`]);
        });
    });
});
