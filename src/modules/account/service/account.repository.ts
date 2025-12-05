import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Account, AccountDocument } from "../data";
import { InjectModel } from "@nestjs/mongoose";
import { IAccountRepository } from "../behavior";
import { VDocument } from "@Package/index";


@Injectable()
export class AccountRepository extends IAccountRepository<Account> {
    constructor(
        @InjectModel(Account.name) private readonly accountModel: Model<VDocument<Account>>,
    ) {
        super(accountModel);
    }
}   