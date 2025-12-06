import { Account } from "@Modules/account";
import { AccountPayload } from "@Package/auth";

export abstract class ITokenService {

    abstract generateAndCache(payload: AccountPayload): Promise<string>;

    abstract buildPayload(account: Account, overrides?: Partial<AccountPayload>): AccountPayload;

    abstract invalidate(userId: string): Promise<void>;
}
