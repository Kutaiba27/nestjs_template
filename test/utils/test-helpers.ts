// Define AccountRole enum locally to avoid circular imports
export enum TestAccountRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface TestAccountPayload {
    id: string;
    email: string;
    accountRole: TestAccountRole;
    isVerified: boolean;
    isActive: boolean;
    resetPasswordToken?: boolean;
}

export const createMockAccount = (overrides?: Partial<any>) => ({
    id: 'test-uuid-123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'hashedPassword123',
    accountRole: TestAccountRole.USER,
    isActive: true,
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

export const createMockAccountPayload = (overrides?: Partial<TestAccountPayload>): TestAccountPayload => ({
    id: 'test-uuid-123',
    email: 'test@example.com',
    accountRole: TestAccountRole.USER,
    isVerified: false,
    isActive: true,
    ...overrides,
});

export const createMockLoginDto = (overrides?: Partial<any>) => ({
    email: 'test@example.com',
    password: 'Password123',
    ...overrides,
});

export const createMockSignUpDto = (overrides?: Partial<any>) => ({
    email: 'test@example.com',
    password: 'Password123',
    firstName: 'Test',
    lastName: 'User',
    ...overrides,
});

export const createMockVerifyOtpDto = (overrides?: Partial<any>) => ({
    otp: '123456',
    ...overrides,
});

export const generateTestToken = (): string => {
    return 'test-jwt-token-' + Date.now();
};

export const generateTestOtp = (): string => {
    return '123456';
};
