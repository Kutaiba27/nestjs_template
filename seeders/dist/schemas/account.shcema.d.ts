export type AccountDocument = Account & Document;
export declare enum AccountRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class Account {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    password?: string;
    isActive?: boolean;
    isVerified?: boolean;
    accountRole: AccountRole;
}
export declare const AccountSchema: import("mongoose").Schema<Account, import("mongoose").Model<Account, any, any, any, import("mongoose").Document<unknown, any, Account, any, import("mongoose").DefaultSchemaOptions> & Account & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Account>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    firstName?: import("mongoose").SchemaDefinitionProperty<string, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    lastName?: import("mongoose").SchemaDefinitionProperty<string, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    phoneNumber?: import("mongoose").SchemaDefinitionProperty<string, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    password?: import("mongoose").SchemaDefinitionProperty<string, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    isVerified?: import("mongoose").SchemaDefinitionProperty<boolean, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    accountRole?: import("mongoose").SchemaDefinitionProperty<AccountRole, Account, import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Account & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}, Account>;
