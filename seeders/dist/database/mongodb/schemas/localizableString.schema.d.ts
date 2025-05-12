import { Document } from "mongoose";
export type LocalizableStringDocument = LocalizableString & Document;
export declare class LocalizableString {
    en: string;
    ar: string;
}
export declare const LocalizableStringSchema: import("mongoose").Schema<LocalizableString, import("mongoose").Model<LocalizableString, any, any, any, Document<unknown, any, LocalizableString> & LocalizableString & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LocalizableString, Document<unknown, {}, import("mongoose").FlatRecord<LocalizableString>> & import("mongoose").FlatRecord<LocalizableString> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
