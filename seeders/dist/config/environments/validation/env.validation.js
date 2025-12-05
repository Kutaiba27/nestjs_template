"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devValidationSchema = void 0;
const joi = require("joi");
const devValidationSchema = () => {
    const schema = joi.object({
        app: joi.object({
            port: joi.number().required(),
            host: joi.string().required(),
            name: joi.string().required(),
            baseUrl: joi.string().required(),
            version: joi.number().required(),
            globalPrefix: joi.string().required(),
            defaultLanguage: joi.string().required()
        }).required(),
        mongodb: joi.object({
            host: joi.string().required(),
            port: joi.number().required(),
            password: joi.string(),
            username: joi.string(),
            name: joi.string().required(),
        }).required(),
        jwt: joi.object({
            jwtAccessSecret: joi.string().required(),
            jwtRefreshSecret: joi.string(),
            jwtExpiredRefresh: joi.string(),
            jwtExpiredAccess: joi.string().required(),
            ttlRefreshToken: joi.number().required()
        }).required(),
        mail: joi.object({
            host: joi.string().required(),
            port: joi.number().required(),
            user: joi.string().required(),
            password: joi.string().required(),
            from: joi.string()
        }).required(),
        redis: joi.object({
            host: joi.string().required(),
            port: joi.number().required(),
            databaseIndex: joi.number().required(),
            password: joi.string().allow(""),
            name: joi.string().required(),
        }).required(),
        file: joi.object({
            maxFileSize: joi.number().required(),
            baseUrl: joi.string().required(),
        }).required(),
        twelve: joi.object({
            apiKye: joi.string().required(),
            baseUrl: joi.string().required()
        }),
        swagger: joi.object({
            password: joi.string().required(),
            userName: joi.string().required()
        })
    });
    return schema;
};
exports.devValidationSchema = devValidationSchema;
//# sourceMappingURL=env.validation.js.map