import {Module, Logger, OnModuleInit} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection} from "mongoose";
import * as console from "node:console";
import { EnvironmentService } from '@Infrastructure/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [EnvironmentService],
            useFactory: async (env: EnvironmentService)=> {
                const host = env.get('mongodb.host') ?? 'localhost';
                const port = env.get('mongodb.port') ?? 27017;
                const username = env.get('mongodb.username') ?? '';
                const password = env.get('mongodb.password') ?? '';
                const database = env.get('mongodb.name') ?? 'app';
                const uri = username && password
                    ? `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin&replicaSet=rs0`
                    : `mongodb://${host}:${port}/${database}`;

                // const uri = `mongodb://127.0.0.1:27027/ahluda`;
                // const uri = `mongodb://${host}:27017/${database}`;
                const logger = new Logger('MongoDB');
                return {
                    uri,
                    connectionFactory: (connection: Connection, name: string) => {
                        connection.on('connected', () => {
                            logger.log('✅ Successfully connected to MongoDB', name);
                        });
                        connection.on('error', (err) => {
                            logger.error('MongoDB connection error:', err);
                        });
                        connection.on('disconnected', () => {
                            logger.warn('MongoDB disconnected');
                        });
                        connection.plugin((schema: any) => {
                            schema.options.toJSON = {
                                virtuals: true,
                                versionKey: false,
                                transform(doc: any, ret: any) {
                                    if (ret.password) delete ret.password;
                                    ret.id = ret._id;
                                    delete ret._id;
                                },
                            };
                            schema.options.toObject = {
                                virtuals: true,
                                versionKey: false,
                                transform(doc: any, ret: any) {
                                    if (ret.password) delete ret.password;
                                    delete ret._id;
                                },
                            };
                        });
                        return connection;
                    },
                };
            },
        })
    ]
})
export class MongoConnection {
}
