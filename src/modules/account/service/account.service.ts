import { AdminErrorCode } from "@Common/error";
import { ErrorServiceFactory } from "@Package/error";
import { IAccountAdminService, IAccountRepository, IAccountService } from "../behavior";
import { Account } from "../data";
import { Injectable } from "@nestjs/common";
import { ClientSession } from "mongoose";
import { generateUUIDV7 } from "@Package/utilities";

@Injectable()
export class AccountService implements IAccountService {

    private AccountError = ErrorServiceFactory.createErrorService("Account Error")
    constructor(
        private readonly accountRepository: IAccountRepository,
    ) {
    }
    async update(id: string, account: Partial<Account>, options?: { session?: ClientSession; }):Promise<void>{
        await this.accountRepository.updateOne({
            filter: {
                id: id,
            },
            update: account,
            options: options,
        });
    }
    
    async findByEmail(email: string, throwError: boolean = true): Promise<Account> {
        return this.accountRepository.findOne({
            filter: {
                email: email,   
            },
            error: throwError ? this.AccountError.error(AdminErrorCode.ACCOUNT.ACCOUNT_NOT_FOUND) : null,
        });
    }

    async create(account: Account, options?: {session?:ClientSession}): Promise<Account> {
        const id = generateUUIDV7()
        return this.accountRepository.create({ doc: { ...account, id }, options: {session: options.session} });
    }

}