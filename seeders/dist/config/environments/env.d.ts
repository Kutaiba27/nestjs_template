import { IDatabaseEnv } from './interfaces/database.inteface';
import { IAppEnv } from './interfaces/app.interface';
import { IBaseEnv } from './interfaces/base.interface';
import { MailConfig } from './interfaces/email.interface';
import { IRedisEnv } from './interfaces/redis.interface';
import { IFileEnv } from './interfaces/file.interface';
import { TwelveEnv } from './interfaces/twelve.interface';
import { SwaggerEnv } from './interfaces/swagger.interface';
import { IJWTEnv } from './interfaces/jwt.interface';
export interface IEnv extends IBaseEnv {
    app: IAppEnv;
    mongodb: IDatabaseEnv;
    jwt: IJWTEnv;
    mail: MailConfig;
    redis: IRedisEnv;
    file: IFileEnv;
    twelve: TwelveEnv;
    swagger: SwaggerEnv;
}
export declare const GetEnv: () => IEnv;
