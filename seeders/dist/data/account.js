"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
const account_shcema_1 = require("../schemas/account.shcema");
exports.account = {
    admin: {
        _id: "300000000000000000000002",
        id: "00000000-0000-0000-0000-000000000001",
        email: "admin@example.com",
        password: "123456789",
        isActive: true,
        accountRole: account_shcema_1.AccountRole.ADMIN,
        isVerified: true,
        phoneNumber: "+9665993845496",
    }
};
//# sourceMappingURL=account.js.map