import { createMockAccountPayload, generateTestToken, generateTestOtp } from '../utils/test-helpers';

export const createMockAccountService = () => ({
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
});

export const createMockCacheService = () => ({
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(1),
    hgetAll: jest.fn().mockResolvedValue(null),
    hset: jest.fn().mockResolvedValue(1),
    lrange: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    ttl: jest.fn().mockResolvedValue(-1),
});

export const createMockTokenService = () => ({
    generateAndCache: jest.fn().mockResolvedValue(generateTestToken()),
    buildPayload: jest.fn().mockReturnValue(createMockAccountPayload()),
    invalidate: jest.fn().mockResolvedValue(undefined),
});

export const createMockOTPService = () => ({
    generate: jest.fn().mockReturnValue(generateTestOtp()),
    store: jest.fn().mockResolvedValue(generateTestOtp()),
    verify: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(undefined),
    get: jest.fn().mockResolvedValue(generateTestOtp()),
});

export const createMockHashService = () => ({
    hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
    comparePassword: jest.fn().mockResolvedValue(true),
});

export const createMockEmailQueueService = () => ({
    sendSignUpEmail: jest.fn().mockResolvedValue(undefined),
    sendForgotPasswordEmail: jest.fn().mockResolvedValue(undefined),
});

export const createMockJwtService = () => ({
    sign: jest.fn().mockReturnValue(generateTestToken()),
    verify: jest.fn().mockReturnValue({ email: 'test@example.com', resetPasswordToken: true }),
    signAsync: jest.fn().mockResolvedValue(generateTestToken()),
    verifyAsync: jest.fn().mockResolvedValue({ email: 'test@example.com' }),
});

export const createMockEnvironmentService = () => ({
    get: jest.fn().mockImplementation((key: string) => {
        const config: Record<string, any> = {
            'jwt.jwtExpiredAccess': '1h',
            'app.frontendUrl': 'http://localhost:3000',
        };
        return config[key] || '';
    }),
});

export const createMockConnection = () => {
    const mockSession = {
        startTransaction: jest.fn(),
        commitTransaction: jest.fn().mockResolvedValue(undefined),
        abortTransaction: jest.fn().mockResolvedValue(undefined),
        endSession: jest.fn(),
    };
    return {
        startSession: jest.fn().mockResolvedValue(mockSession),
    };
};
