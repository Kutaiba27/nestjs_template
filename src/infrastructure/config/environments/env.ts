import * as process from 'node:process';
import { IDatabaseEnv } from './interfaces/database.inteface';
import { IAppEnv } from './interfaces/app.interface';
import { IBaseEnv } from './interfaces/base.interface';
import { IJWTEnv } from '@Infrastructure/config/environments/interfaces/jwt.interface';
import { MailConfig } from './interfaces/email.interface';
import { ICacheEnv } from './interfaces/redis.interface';
import { SwaggerEnv } from './interfaces/swagger.interface';
export interface IEnv extends IBaseEnv {
  app: IAppEnv,
  mongodb: IDatabaseEnv;
  jwt: IJWTEnv;
  mail: MailConfig
  redis: ICacheEnv
  swagger: SwaggerEnv
}

export const GetEnv = (): IEnv => ({
  app: {
    host: process.env.HOST,
    name: process.env.NAME,
    port: +process.env.PORT,
    version: +process.env.VERSION,
    globalPrefix: process.env.GLOBAL_PREFIX,
    frontendUrl: process.env.FRONTEND_URL,
  },
  mongodb: {
    host: process.env.MONGODB_HOST,
    port: +process.env.MONGODB_PORT,
    password: process.env.MONGODB_PASSWORD,
    username: process.env.MONGODB_USERNAME,
    name: process.env.MONGODB_NAME,
  },
  jwt: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtExpiredAccess: process.env.JWT_EXPIRED_ACCESS,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM_NAME,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    databaseIndex: +process.env.REDIS_DATABASE_INDEX,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
    name: process.env.REDIS_NAME,
  },
  swagger: {
    password: process.env.SWAGGER_PASSWORD,
    userName: process.env.SWAGGER_USERNAME
  }
})


