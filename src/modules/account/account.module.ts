import { Module } from "@nestjs/common";
import { AccountAdminService, AccountWebService, AccountRepository } from "./service";
import { AccountAdminController } from "./api/controllers/account.admin.controller";
import { AccountWebController } from "./api/controllers/account.web.controller";
import { Account, AccountSchema } from "./data";
import { MongooseModule } from "@nestjs/mongoose";
import { IAccountAdminService, IAccountRepository, IAccountService, IAccountWebService } from "./behavior";
import { AccountService } from "./service/account.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
    providers: [
        {
            provide: IAccountAdminService,
            useClass: AccountAdminService,
        },
        {
            provide: IAccountWebService,
            useClass: AccountWebService,
        },
        {
            provide: IAccountRepository,
            useClass: AccountRepository,
        },
        {
            provide: IAccountService,
            useClass: AccountService,
        }
    ],
    controllers: [AccountAdminController, AccountWebController],
    exports: [IAccountService]
})
export class AccountModule {}