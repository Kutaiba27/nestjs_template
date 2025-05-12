"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDevEnv = void 0;
const process = require("node:process");
const GetDevEnv = () => ({
    app: {
        host: process.env.HOST,
        name: process.env.NAME,
        port: +process.env.PORT
    },
    mongodb: {
        host: process.env.MONGODB_HOST,
        port: +process.env.MONGODB_PORT,
        password: process.env.MONGODB_PASSWORD,
        username: process.env.MONGODB_USERNAME,
        name: process.env.MONGODB_NAME,
    }
});
exports.GetDevEnv = GetDevEnv;
//# sourceMappingURL=dev.env.js.map