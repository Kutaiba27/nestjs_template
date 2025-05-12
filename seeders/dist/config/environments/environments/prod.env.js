"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProdEnv = void 0;
const process = require("node:process");
const GetProdEnv = () => ({
    app: {
        host: process.env.HOST,
        name: process.env.NAME,
        port: +process.env.PORT
    },
    database: {
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER
    }
});
exports.GetProdEnv = GetProdEnv;
//# sourceMappingURL=prod.env.js.map