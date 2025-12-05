"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnection = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("../../config");
let MongoConnection = class MongoConnection {
};
exports.MongoConnection = MongoConnection;
exports.MongoConnection = MongoConnection = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.EnvironmentService],
                useFactory: async (env) => {
                    const host = env.get('mongodb.host');
                    const port = env.get('mongodb.port');
                    const username = env.get('mongodb.username');
                    const password = env.get('mongodb.password');
                    const database = env.get('mongodb.name');
                    const uri = username && password
                        ? `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin&replicaSet=rs0`
                        : `mongodb://${host}:${port}/${database}`;
                    const logger = new common_1.Logger('MongoDB');
                    logger.verbose(uri);
                    return {
                        uri,
                        connectionFactory: (connection, name) => {
                            connection.on('connected', () => {
                                logger.log('Successfully connected to MongoDB', name);
                            });
                            connection.on('error', (err) => {
                                logger.error('MongoDB connection error:', err);
                            });
                            connection.on('disconnected', () => {
                                logger.warn('MongoDB disconnected');
                            });
                            connection.plugin((schema) => {
                                schema.options.toJSON = {
                                    virtuals: true,
                                    versionKey: false,
                                    transform(doc, ret) {
                                        if (ret.password)
                                            delete ret.password;
                                        ret.id = ret._id;
                                        delete ret._id;
                                    },
                                };
                                schema.options.toObject = {
                                    virtuals: true,
                                    versionKey: false,
                                    transform(doc, ret) {
                                        if (ret.password)
                                            delete ret.password;
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
], MongoConnection);
//# sourceMappingURL=mongo.module.js.map