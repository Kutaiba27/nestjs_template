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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const account_shcema_1 = require("./schemas/account.shcema");
const data_1 = require("./data");
let SeederService = SeederService_1 = class SeederService {
    accountModel;
    logger = new common_1.Logger(SeederService_1.name);
    constructor(accountModel) {
        this.accountModel = accountModel;
    }
    async seed() {
        try {
            this.logger.log('Starting database seeding...');
            await this.accountSeed();
            this.logger.log('Database seeding completed successfully');
        }
        catch (error) {
            this.logger.error('Error seeding database:', error.message);
        }
    }
    async clearDatabase() {
        this.logger.log('Clearing existing data...');
        await this.accountModel.deleteMany({});
        this.logger.log('Database cleared');
    }
    async accountSeed() {
        this.logger.log('Seeding users...');
        const accounts = Object.keys(data_1.account);
        await Promise.all(accounts.map(async (accountKey) => {
            const accountData = data_1.account[accountKey];
            await this.accountModel.updateOne({ id: accountData.id }, { $set: accountData }, { upsert: true });
        }));
        this.logger.log('accounts seeded successfully');
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = SeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(account_shcema_1.Account.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SeederService);
//# sourceMappingURL=seeder.service.js.map