"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSchema = exports.Account = exports.AccountRole = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const bcryptjs_1 = require("bcryptjs");
var AccountRole;
(function (AccountRole) {
    AccountRole["ADMIN"] = "admin";
    AccountRole["USER"] = "user";
})(AccountRole || (exports.AccountRole = AccountRole = {}));
let Account = class Account {
    id;
    email;
    firstName;
    lastName;
    phoneNumber;
    password;
    isActive;
    isVerified;
    accountRole;
};
exports.Account = Account;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, index: true }),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true, required: false, sparse: true, index: true }),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, sparse: true }),
    __metadata("design:type", String)
], Account.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, sparse: true }),
    __metadata("design:type", String)
], Account.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true, required: false, sparse: true, index: true }),
    __metadata("design:type", String)
], Account.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, set: (val) => (0, bcryptjs_1.hashSync)(val, 10) }),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Account.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "isVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: Object.values(AccountRole), default: AccountRole.USER }),
    __metadata("design:type", String)
], Account.prototype, "accountRole", void 0);
exports.Account = Account = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Account);
exports.AccountSchema = mongoose_1.SchemaFactory.createForClass(Account);
//# sourceMappingURL=account.shcema.js.map