import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '@Modules/account/service/account.service';
import { IAccountRepository } from '@Modules/account/behavior';
import { createMockAccountRepository } from '../../../../mocks/repositories.mock';
import { createMockAccount, TestAccountRole } from '../../../../utils/test-helpers';

describe('AccountService', () => {
    let service: AccountService;
    let accountRepository: any;

    beforeEach(async () => {
        const mockRepository = createMockAccountRepository();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountService,
                { provide: IAccountRepository, useValue: mockRepository },
            ],
        }).compile();

        service = module.get<AccountService>(AccountService);
        accountRepository = module.get(IAccountRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create account with generated UUID', async () => {
            const accountData = {
                email: 'test@example.com',
                password: 'hashedPassword',
                firstName: 'Test',
                lastName: 'User',
                accountRole: TestAccountRole.USER,
            };
            const createdAccount = createMockAccount(accountData);
            accountRepository.create.mockResolvedValue(createdAccount as any);

            const result = await service.create(accountData as any);

            expect(result).toBeDefined();
            expect(accountRepository.create).toHaveBeenCalledWith({
                doc: expect.objectContaining({
                    ...accountData,
                    id: expect.any(String),
                }),
                options: expect.any(Object),
            });
        });

        it('should pass session options when provided', async () => {
            const accountData = {
                email: 'test@example.com',
                password: 'hashedPassword',
                firstName: 'Test',
                lastName: 'User',
                accountRole: TestAccountRole.USER,
            };
            const mockSession = {} as any;
            const createdAccount = createMockAccount(accountData);
            accountRepository.create.mockResolvedValue(createdAccount as any);

            await service.create(accountData as any, { session: mockSession });

            expect(accountRepository.create).toHaveBeenCalledWith({
                doc: expect.any(Object),
                options: { session: mockSession },
            });
        });
    });

    describe('findByEmail', () => {
        it('should find account by email', async () => {
            const email = 'test@example.com';
            const account = createMockAccount({ email });
            accountRepository.findOne.mockResolvedValue(account as any);

            const result = await service.findByEmail(email);

            expect(result).toEqual(account);
            expect(accountRepository.findOne).toHaveBeenCalledWith({
                filter: { email },
                error: expect.any(Object),
            });
        });

        it('should return null without throwing when throwError is false', async () => {
            const email = 'nonexistent@example.com';
            accountRepository.findOne.mockResolvedValue(null as any);

            const result = await service.findByEmail(email, false);

            expect(result).toBeNull();
            expect(accountRepository.findOne).toHaveBeenCalledWith({
                filter: { email },
                error: undefined,
            });
        });

        it('should throw error when account not found and throwError is true', async () => {
            const email = 'nonexistent@example.com';
            accountRepository.findOne.mockRejectedValue(new Error('Account not found'));

            await expect(service.findByEmail(email, true)).rejects.toThrow();
        });
    });

    describe('update', () => {
        it('should update account fields', async () => {
            const id = 'test-uuid-123';
            const updateData = { firstName: 'Updated', lastName: 'Name' };
            accountRepository.updateOne.mockResolvedValue({ modifiedCount: 1 } as any);

            await service.update(id, updateData);

            expect(accountRepository.updateOne).toHaveBeenCalledWith({
                filter: { id },
                update: updateData,
                options: undefined,
            });
        });

        it('should pass session options when provided', async () => {
            const id = 'test-uuid-123';
            const updateData = { isVerified: true };
            const mockSession = {} as any;
            accountRepository.updateOne.mockResolvedValue({ modifiedCount: 1 } as any);

            await service.update(id, updateData, { session: mockSession });

            expect(accountRepository.updateOne).toHaveBeenCalledWith({
                filter: { id },
                update: updateData,
                options: { session: mockSession },
            });
        });
    });
});
