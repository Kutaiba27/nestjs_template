import { BaseMongoRepository } from "@Package/index";
import { Account } from "../data";


export abstract class IAccountRepository<T = Account> extends BaseMongoRepository<T>  {}
