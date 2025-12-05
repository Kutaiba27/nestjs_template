"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEnv = void 0;
const process = require("node:process");
const GetEnv = () => ({
    app: {
        host: process.env.HOST,
        name: process.env.NAME,
        port: +process.env.PORT,
        baseUrl: process.env.BASE_URL,
        version: +process.env.VERSION,
        defaultLanguage: process.env.DEFAULT_LANGUAGE,
        globalPrefix: process.env.GLOBAL_PREFIX
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
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
        jwtExpiredRefresh: process.env.JWT_EXPIRED_REFRESH,
        jwtExpiredAccess: process.env.JWT_EXPIRED_ACCESS,
        ttlRefreshToken: +process.env.REFRESH_TOKEN_REDIS_EXPIERD,
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
        name: process.env.REDIS_NAME,
    },
    file: {
        maxFileSize: +process.env.MAX_FILE_SIZE,
        baseUrl: process.env.BASE_URL,
    },
    twelve: {
        apiKye: process.env.TWELVE_API_KEY,
        baseUrl: process.env.BASE_TWELVE_URL,
    },
    swagger: {
        password: process.env.SWAGGER_PASSWORD,
        userName: process.env.SWAGGER_USERNAME
    }
});
exports.GetEnv = GetEnv;
//# sourceMappingURL=env.js.map