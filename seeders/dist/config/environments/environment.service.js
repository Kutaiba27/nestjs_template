"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentService = exports.loadEnv = exports.getCurrentEnv = void 0;
const env_enum_1 = require("./interfaces/env.enum");
const dev_env_1 = require("./environments/dev.env");
const prod_env_1 = require("./environments/prod.env");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const process = require("node:process");
const getCurrentEnv = () => {
    const env = process.env.NODE_ENV;
    if (!Object.values(env_enum_1.EnumEnvironment).includes(env)) {
        throw new Error("environment must be in ['development','production','local','test']");
    }
    return env;
};
exports.getCurrentEnv = getCurrentEnv;
const loadEnv = () => {
    const env = (0, exports.getCurrentEnv)();
    switch (env) {
        case env_enum_1.EnumEnvironment.DEV:
            return (0, dev_env_1.GetDevEnv)();
        case env_enum_1.EnumEnvironment.PRODUCTION:
            return (0, prod_env_1.GetProdEnv)();
        default:
            throw new Error(`Unknown environment environment: ${env}`);
    }
};
exports.loadEnv = loadEnv;
let EnvironmentService = class EnvironmentService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    get(path, insteadValue) {
        return this.configService.get(path) ?? insteadValue;
    }
};
exports.EnvironmentService = EnvironmentService;
exports.EnvironmentService = EnvironmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EnvironmentService);
//# sourceMappingURL=environment.service.js.map