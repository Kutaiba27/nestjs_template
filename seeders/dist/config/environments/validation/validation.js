"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_enum_1 = require("../interfaces/env.enum");
const dev_validation_1 = require("./dev.validation");
const environment_service_1 = require("../environment.service");
const validationSchemaEvn = () => {
    const env = (0, environment_service_1.getCurrentEnv)();
    switch (env) {
        case env_enum_1.EnumEnvironment.DEV:
            return dev_validation_1.devValidationSchema;
        default:
            return dev_validation_1.devValidationSchema;
    }
};
//# sourceMappingURL=validation.js.map