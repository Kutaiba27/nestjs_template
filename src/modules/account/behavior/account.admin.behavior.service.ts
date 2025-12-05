import { GetAllAccountsDto } from "../api/dto/request/get-all-accounts.dto";
import { UpdateAccountDto } from "../api/dto/request/update-account.dto";
import { Account } from "../data";
import { IPagination } from "@Package/api";


export abstract class IAccountAdminService {
    abstract create(account: Partial<Account>): Promise<void>;
    abstract findAll(query: GetAllAccountsDto, pagination: IPagination): Promise<{data: Account[], total: number}>;
    abstract findOne(id: string): Promise<Account>;
    abstract update(id: string, accountData: UpdateAccountDto): Promise<void>;
    abstract remove(id: string): Promise<void>;
}