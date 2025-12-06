import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { IBaseEntity } from "@Package/index";
import { AccountRole } from "./account-role.type";
import { hashSync } from "bcryptjs";

export type AccountDocument = Account & Document;

@Schema({
    timestamps: true,
})
export class Account extends IBaseEntity{

    @Prop({ type: String, unique: true, required: true, sparse: true, index: true })
    email: string;
    @Prop({ type: String, required: false, sparse: true })
    firstName?: string;
    @Prop({ type: String, required: false, sparse: true })
    lastName?: string;
    @Prop({ type: String, required: true, set: (val: string) => hashSync(val, 10) })
    password?: string;
    @Prop({ type: Boolean, default: true })
    isActive?: boolean;
    @Prop({ type: Boolean, default: false })
    isVerified?: boolean;
    @Prop({ type: String, required: true, enum: Object.values(AccountRole), default: AccountRole.USER })
    accountRole: AccountRole;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.index({ email: 1 }, { unique: true });
