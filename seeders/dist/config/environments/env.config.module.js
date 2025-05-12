"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EnvConfigModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfigModule = exports.AppEnvConfig = void 0;
const config_1 = require("@nestjs/config");
const environment_service_1 = require("./environment.service");
const common_1 = require("@nestjs/common");
exports.AppEnvConfig = config_1.ConfigModule.forRoot({
    envFilePath: [`${(0, environment_service_1.getCurrentEnv)()}.env`],
    isGlobal: true,
    load: [() => (0, environment_service_1.loadEnv)()],
});
let EnvConfigModule = EnvConfigModule_1 = class EnvConfigModule {
    logger = new common_1.Logger(EnvConfigModule_1.name);
    onModuleInit() {
        this.logger.verbose("Environments initialized");
    }
};
exports.EnvConfigModule = EnvConfigModule;
exports.EnvConfigModule = EnvConfigModule = EnvConfigModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [exports.AppEnvConfig],
        providers: [environment_service_1.EnvironmentService],
        exports: [environment_service_1.EnvironmentService],
    })
], EnvConfigModule);
//# sourceMappingURL=env.config.module.js.map