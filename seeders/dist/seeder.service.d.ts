import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
export declare class SeederService implements OnModuleInit {
    private readonly userModel;
    private readonly logger;
    constructor(userModel: Model<UserDocument>);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
    private clearDatabase;
    private seedUsers;
}
