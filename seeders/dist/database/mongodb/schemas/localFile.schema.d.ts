import { Document } from "mongoose";
export type LocalFileDocument = LocalFile & Document;
export declare class LocalFile {
    filename: string;
    mimetype: string;
    key: string;
    originalFilename: string;
    relativePath: string;
    extension: string;
}
export declare const LocalFileSchema: import("mongoose").Schema<LocalFile, import("mongoose").Model<LocalFile, any, any, any, Document<unknown, any, LocalFile> & LocalFile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LocalFile, Document<unknown, {}, import("mongoose").FlatRecord<LocalFile>> & import("mongoose").FlatRecord<LocalFile> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
