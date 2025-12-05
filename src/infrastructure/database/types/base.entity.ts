import { Prop } from "@nestjs/mongoose";

export class IBaseEntity {

    @Prop({ type: String, required: true, index: true })
    id: string;

    @Prop({ type: Date})
    createdAt?: Date;

    @Prop({ type: Date})
    updatedAt?: Date;
}