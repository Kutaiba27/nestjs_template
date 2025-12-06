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
    host: process.env.HOST ?? 'localhost',
    name: process.env.NAME ?? 'app',
    port: +(process.env.PORT ?? 3000),
    version: +(process.env.VERSION ?? 1),
    globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  },
  mongodb: {
    host: process.env.MONGODB_HOST ?? 'localhost',
    port: +(process.env.MONGODB_PORT ?? 27017),
    password: process.env.MONGODB_PASSWORD ?? '',
    username: process.env.MONGODB_USERNAME ?? '',
    name: process.env.MONGODB_NAME ?? 'app',
  },
  jwt: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'secret',
    jwtExpiredAccess: process.env.JWT_EXPIRED_ACCESS ?? '1d',
  },
  mail: {
    host: process.env.MAIL_HOST ?? 'localhost',
    port: +(process.env.MAIL_PORT ?? 587),
    user: process.env.MAIL_USER ?? '',
    password: process.env.MAIL_PASS ?? '',
    from: process.env.MAIL_FROM_NAME ?? 'App',
  },
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: +(process.env.REDIS_PORT ?? 6379),
    databaseIndex: +(process.env.REDIS_DATABASE_INDEX ?? 0),
    password: process.env.REDIS_PASSWORD ?? '',
    username: process.env.REDIS_USERNAME ?? '',
    name: process.env.REDIS_NAME ?? 'app',
  },
  swagger: {
    password: process.env.SWAGGER_PASSWORD ?? 'admin',
    userName: process.env.SWAGGER_USERNAME ?? 'admin'
  }
})


