import { ClientSession } from "mongoose";
import { Account } from "../data";


export abstract class IAccountService {
    abstract create(account: Partial<Account>, options?: {session?:ClientSession}): Promise<Account>;
    abstract findByEmail(email: string, throwError?: boolean): Promise<Account>;
    abstract update(id: string, account: Partial<Account>, options?: {session?:ClientSession}): Promise<void>;
}