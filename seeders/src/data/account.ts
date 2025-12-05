import { AccountRole } from "../schemas/account.shcema";

export const account = {
    admin: {
        _id: "300000000000000000000002",
        id: "00000000-0000-0000-0000-000000000001",
        email: "admin@example.com",
        password: "123456789",
        firstName: "Admin",
        lastName: "Admin",
        isActive: true,
        accountRole: AccountRole.ADMIN,
        isVerified: true,
        phoneNumber: "+9665993845496",
    }
}