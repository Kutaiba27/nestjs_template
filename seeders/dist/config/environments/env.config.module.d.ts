import { EnvironmentService } from './environment.service';
import { OnModuleInit } from '@nestjs/common';
export declare const AppEnvConfig: Promise<import("@nestjs/common").DynamicModule>;
export declare class EnvConfigModule implements OnModuleInit {
    private readonly environmentService;
    constructor(environmentService: EnvironmentService);
    onModuleInit(): any;
}
export declare function setEnvironmentService(service: EnvironmentService): void;
export declare function getEnvService(): EnvironmentService;
