import { AccountRole } from "../schemas/account.shcema";
export declare const account: {
    admin: {
        _id: string;
        id: string;
        email: string;
        password: string;
        isActive: boolean;
        accountRole: AccountRole;
        isVerified: boolean;
        phoneNumber: string;
    };
};
