import { EnumEnvironment } from './interfaces/env.enum';
import { IBaseEnv } from './interfaces/base.interface';
import { IDevEnv } from './environments/dev.env';
import { ConfigService } from '@nestjs/config';
export declare const getCurrentEnv: () => EnumEnvironment;
export declare const loadEnv: () => IBaseEnv;
export type Leaves<T> = T extends object ? {
    [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}`;
}[keyof T] : never;
export type LeafTypes<T, S extends string> = S extends `${infer T1}.${infer T2}` ? T1 extends keyof T ? LeafTypes<T[T1], T2> : never : S extends keyof T ? T[S] : never;
export declare class EnvironmentService {
    private configService;
    constructor(configService: ConfigService);
    get<T extends Leaves<IDevEnv>>(path: T, insteadValue?: LeafTypes<IDevEnv, T>): LeafTypes<IDevEnv, T>;
}
