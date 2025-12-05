import { IAccountRepository, IAccountWebService } from "../behavior";
import { Injectable } from "@nestjs/common";
import { Account } from "../data";
import { ErrorServiceFactory } from "@Package/error";
import { ClientSideErrorCode } from "@Common/error";

@Injectable()
export class AccountWebService implements IAccountWebService {
    private readonly AccountWebServiceError = ErrorServiceFactory.createErrorService(AccountWebService.name);

    constructor(
        private readonly accountRepository: IAccountRepository,
    ) {}

    async findOne(id: string): Promise<Account> {
        const account = await this.accountRepository.findOne({
            filter: {
                id: id,
            },
            error: this.AccountWebServiceError.error(ClientSideErrorCode.ACCOUNT.ACCOUNT_NOT_FOUND),
        });
        return account;
    }

    async update(id: string, account: Partial<Account>): Promise<Account> {
        const updatedAccount = await this.accountRepository.findOneAndUpdate({
            filter: {
                id: id,
            },
            update: account,
            error: this.AccountWebServiceError.error(ClientSideErrorCode.ACCOUNT.ACCOUNT_NOT_FOUND),
        });
        return updatedAccount;
    }

    async changePassword(id: string, password: string): Promise<void> {
        await this.accountRepository.updateOne({
            filter: {
                id: id,
            },
            update: { password: password },
        });
        return;
    }
}