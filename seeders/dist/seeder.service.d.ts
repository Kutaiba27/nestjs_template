import { Model } from 'mongoose';
import { AccountDocument } from './schemas/account.shcema';
export declare class SeederService {
    private readonly accountModel;
    private readonly logger;
    constructor(accountModel: Model<AccountDocument>);
    seed(): Promise<void>;
    private clearDatabase;
    private accountSeed;
}
