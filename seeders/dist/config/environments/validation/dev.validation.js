"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devValidationSchema = void 0;
const joi = require("joi");
const environment_service_1 = require("../environment.service");
const devValidationSchema = () => {
    const schema = joi.object({
        app: joi.object({
            port: joi.number().required(),
            host: joi.string().required(),
            name: joi.string().required()
        }).required(),
        mongodb: joi.object({
            host: joi.string().required(),
            port: joi.number().required(),
            password: joi.string().required(),
            username: joi.string().required(),
            name: joi.string().required(),
        }).required(),
    });
    console.log(schema.validate((0, environment_service_1.loadEnv)()));
    return schema;
};
exports.devValidationSchema = devValidationSchema;
//# sourceMappingURL=dev.validation.js.map