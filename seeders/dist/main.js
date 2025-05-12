"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seeder_module_1 = require("./seeder.module");
const seeder_service_1 = require("./seeder.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(seeder_module_1.SeederModule);
    const seeder = app.get(seeder_service_1.SeederService);
    await seeder.seed();
    await app.close();
}
void bootstrap();
//# sourceMappingURL=main.js.map