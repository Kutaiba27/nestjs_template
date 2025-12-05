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
exports.EnvConfigModule = exports.AppEnvConfig = void 0;
exports.setEnvironmentService = setEnvironmentService;
exports.getEnvService = getEnvService;
const config_1 = require("@nestjs/config");
const environment_service_1 = require("./environment.service");
const common_1 = require("@nestjs/common");
const env_1 = require("./env");
exports.AppEnvConfig = config_1.ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/../.env`,
    isGlobal: true,
    load: [() => {
            const env = (0, env_1.GetEnv)();
            return env;
        }],
});
let EnvConfigModule = class EnvConfigModule {
    environmentService;
    constructor(environmentService) {
        this.environmentService = environmentService;
    }
    onModuleInit() {
        setEnvironmentService(this.environmentService);
    }
};
exports.EnvConfigModule = EnvConfigModule;
exports.EnvConfigModule = EnvConfigModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [exports.AppEnvConfig],
        providers: [environment_service_1.EnvironmentService],
        exports: [environment_service_1.EnvironmentService],
    }),
    __metadata("design:paramtypes", [environment_service_1.EnvironmentService])
], EnvConfigModule);
let environmentServiceInstance;
function setEnvironmentService(service) {
    environmentServiceInstance = service;
}
function getEnvService() {
    if (!environmentServiceInstance) {
        throw new Error('EnvironmentService is not set. Make sure you initialized it in a module.');
    }
    return environmentServiceInstance;
}
//# sourceMappingURL=env.config.module.js.map