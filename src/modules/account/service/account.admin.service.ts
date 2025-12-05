import { IAccountAdminService, IAccountRepository } from "../behavior";
import { Injectable } from "@nestjs/common";
import { Account, AccountRole } from "../data";
import { GetAllAccountsDto } from "../api/dto/request/get-all-accounts.dto";
import { ErrorServiceFactory } from "@Package/error";
import { AdminErrorCode } from "@Common/error";
import { UpdateAccountDto } from "../api/dto/request/update-account.dto";
import { IPagination } from "@Package/api";

@Injectable()
export class AccountAdminService implements IAccountAdminService {
    private AccountError = ErrorServiceFactory.createErrorService("Account Error")
    constructor(
        private readonly accountRepository: IAccountRepository,
    ) {
    }
    async create(account: Partial<Account>): Promise<void> {
        await this.accountRepository.create({ doc: account as Account });
        return;
    }
    async findAll(query: GetAllAccountsDto, pagination: IPagination): Promise<{data: Account[], total: number}> {
        const filter: any = {
            accountRole: {
                $in: [AccountRole.ADMIN],
            }
        }
        if(query.search){
            filter["$or"] = [
                {email: {$regex: query.search,$options: 'i',},},
                {phoneNumber: {$regex: query.search,$options: 'i',},}
            ];
        }
        const [accounts, total] = await Promise.all([
            this.accountRepository.find({
                filter,
                options: {
                    ...pagination,
                    sort: {
                        createdAt: -1,
                    }
                },
            }),
            this.accountRepository.countDocuments({
                filter,
            }),
        ]);
        return {
            data: accounts,
            total: total,
        };
    }
    async findOne(id: string): Promise<Account> {
        const account = await this.accountRepository.findOne({
            filter: {
                id: id,
            },
            error: this.AccountError.error(AdminErrorCode.ACCOUNT.ACCOUNT_NOT_FOUND)
        });
        return account;
    }
    async update(id: string, accountData: UpdateAccountDto): Promise<void> {

        const account = await this.accountRepository.findOne({
            filter: {
                id: id,
            },
            error: this.AccountError.error(AdminErrorCode.ACCOUNT.ACCOUNT_NOT_FOUND)
        });
        if(!account){
            throw this.AccountError.error(AdminErrorCode.ACCOUNT.ACCOUNT_NOT_FOUND)
        }
        if(accountData.email == account.email){
            const duplicatedEmail = await this.accountRepository.findOne({
                filter: {
                    email: accountData.email,
                },
            });
            if(duplicatedEmail){
                this.AccountError.throw(AdminErrorCode.ACCOUNT.DUPLICATED_EMAIL)
            }
        }
        await this.accountRepository.updateOne({
            filter: {
                id: id,
            },
            update: accountData,
        });
        return;
    }

    async remove(id: string): Promise<void> {
        await this.accountRepository.findOne({
            filter: {
                id:id
            },
            error: this.AccountError.error(AdminErrorCode.ACCOUNT.ACCOUNT_NOT_FOUND)
        })
        await this.accountRepository.deleteMany({
            filter: {
                id: id,
            },
        });
        return;
    }
}