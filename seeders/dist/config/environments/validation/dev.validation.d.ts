import * as joi from 'joi';
import { IDevEnv } from '../environments/dev.env';
export declare const devValidationSchema: () => joi.ObjectSchema<IDevEnv>;
