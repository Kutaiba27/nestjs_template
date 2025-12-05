import * as joi from 'joi'
import { GetEnv, IEnv } from '../env';
import { IDatabaseEnv } from '../interfaces/database.inteface';
import { IAppEnv } from '../interfaces/app.interface';
import { ICacheEnv } from '../interfaces/redis.interface';

export const devValidationSchema =()=>{
  const schema =joi.object<IEnv>({
    app: joi.object<IAppEnv>({
      port: joi.number().required(),
      host: joi.string().required(),
      name: joi.string().required(),
      version: joi.number().required(),
      globalPrefix: joi.string().required(),
      frontendUrl: joi.string().required(),
    }).required(),
    mongodb: joi.object<IDatabaseEnv>({
      host: joi.string().required(),
      port: joi.number().required(),
      password: joi.string().allow(""),
      username: joi.string().allow(""),
      name: joi.string().required(),
    }).required(),
    jwt:  joi.object({ 
      jwtAccessSecret: joi.string().required(),
      jwtExpiredAccess: joi.string().required(),
    }).required(),
    mail: joi.object({
      host: joi.string().allow(""),
      port: joi.number().allow(""),
      user: joi.string().allow(""),
      password: joi.string().allow(""),
      from: joi.string().allow("")
    }).optional(),
    redis: joi.object<ICacheEnv>({
      host: joi.string().required(),
      port: joi.number().required(),
      databaseIndex: joi.number().required(),
      password: joi.string().allow(""),
      username: joi.string().allow(""),
      name: joi.string().required(),
    }).required(),
    swagger: joi.object({
      password: joi.string().required(),
      userName: joi.string().required()
    })
  })
  return schema;
}


