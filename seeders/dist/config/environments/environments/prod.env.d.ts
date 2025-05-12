import { IDatabaseEnv } from '../interfaces/database.inteface';
import { IAppEnv } from '../interfaces/app.interface';
import { IBaseEnv } from '../interfaces/base.interface';
interface IAppPordEnv extends IAppEnv {
}
interface IDatabasePordEnv extends IDatabaseEnv {
    password: string;
    user: string;
}
export interface IPordEnv extends IBaseEnv {
    app: IAppPordEnv;
    database: IDatabasePordEnv;
}
export declare const GetProdEnv: () => IPordEnv;
export {};
