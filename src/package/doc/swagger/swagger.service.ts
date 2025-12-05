import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvironmentService } from '@Infrastructure/config/environments';

const normalizePath = (...segments: string[]): string =>
    '/' + segments.map(s => s.replace(/^\/|\/$/g, '')).filter(Boolean).join('/');

export const setupSwagger = (app: NestExpressApplication, env: EnvironmentService): void => {
    const ENABLED_ENVS = ['local', 'dev', 'staging', 'testing'];
    const currentEnv = process.env.NODE_ENV || 'local';
    const prefix = env.get('app.globalPrefix');
    const version = `v${env.get('app.version')}`;
    const host = env.get('app.host');
    const port = env.get('app.port');
    const username = env.get('swagger.userName');
    const password = env.get('swagger.password');
    const config = new DocumentBuilder()
        .setTitle(`${env.get('app.name')} API`)
        .setDescription(`${env.get('app.name')} API Documentation`)
        .setVersion(version)
        .addServer(`${env.get('app.host')}:${env.get('app.port')}`, 'Local')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${prefix}/${version}/docs`, app, document, {
        swaggerOptions: {
            tagsSorter: (a: string, b: string) => {
                const order: string[] = ["admin", "web"];

                const getGroupIndex = (name: string) => {
                    const prefix = name.split(" ")[0];   
                    const idx = order.indexOf(prefix);
                    return idx === -1 ? order.length : idx;
                };

                const aIndex = getGroupIndex(a);
                const bIndex = getGroupIndex(b);

                if (aIndex !== bIndex) {
                    return aIndex - bIndex;   }

                return a.localeCompare(b);
            },
        }
    });
    console.log(`\n📚 Swagger is running on http://${host}:${port}/${prefix}/${version}/docs`);
};
