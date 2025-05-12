import { IDatabaseEnv } from '../interfaces/database.inteface';
import { IAppEnv } from '../interfaces/app.interface';
import { IBaseEnv } from '../interfaces/base.interface';
export interface IDevEnv extends IBaseEnv {
    app: IAppEnv;
    mongodb: IDatabaseEnv;
}
export declare const GetDevEnv: () => IDevEnv;
