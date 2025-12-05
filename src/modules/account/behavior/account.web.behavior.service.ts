import { Account } from "../data";

export abstract class IAccountWebService {
    abstract findOne(id: string): Promise<Account>;
    abstract update(id: string, account: Partial<Account>): Promise<Account>;
    abstract changePassword(id: string, password: string): Promise<void>;
}