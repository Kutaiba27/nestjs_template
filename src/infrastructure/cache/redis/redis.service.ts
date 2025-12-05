import { Injectable, OnModuleDestroy, Logger, OnModuleInit } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';
import { EnvironmentService } from "@Infrastructure/config";
import { ICacheService } from "../cach.service";

@Injectable()
export class RedisService implements OnModuleInit,OnModuleDestroy,ICacheService {
    private redis!: Redis;
    private readonly logger = new Logger(RedisService.name);

    constructor(private readonly env: EnvironmentService) { }


    async onModuleInit() {
        await this.connect();
    }

    async connect(): Promise<void> {
        const host = this.env.get('redis.host') ?? 'redis';
        const port = Number(this.env.get('redis.port') ?? 6379);
        const db = Number(this.env.get('redis.databaseIndex') ?? 0);
        const username = this.env.get('redis.username') || undefined;
        const password = this.env.get('redis.password') || undefined;
        
        const options: RedisOptions = {
            host,
            port,
            db,
            lazyConnect: true,                 
            retryStrategy: (times) => Math.min(times * 200, 2000),
            reconnectOnError: () => true,
            maxRetriesPerRequest: null,       
        };
        if (username) options.username = username;
        if (password) options.password = password;

        this.redis = new Redis(options);

        this.redis.on('error', (err) => {
            this.logger.error(`🚫 Redis error: ${err.message}`);
        });
        this.redis.once('ready', () => {
            this.logger.log('✅ Redis is ready');
        });

        this.logger.log(
            `Connecting to Redis: ${host}:${port} (db ${db})${username ? ` as ${username}` : ''}`
        );
        await this.redis.connect();  
        await this.redis.ping();  
    }

    async disconnect(): Promise<void> {
        if (this.redis) {
            await this.redis.quit();
            this.logger.log('🛑 Redis connection closed');
        }
    }
    get client(): Redis {
        if (!this.redis) {
            throw new Error('🚫 Redis client not initialized');
        }
        return this.redis;
    }

    async onModuleDestroy() {
        if (this.redis) {
            await this.disconnect();
        }
    }
    async set({ key, value, ttl }: { key: string, value: any, ttl?: number }): Promise<void> {
        const val = typeof value === 'object' ? JSON.stringify(value) : value;
        await this.redis.set(key, val);
        if (ttl) {
            await this.redis.expire(key, ttl);
        }
    }

    async get<T = any>(key: string): Promise<T | null> {
        const val = await this.redis.get(key);
        try {
            return val ? JSON.parse(val) : null;
        } catch {
            return val as any;
        }
    }

    async hgetAll(key: string) {
        const val = await this.redis.hgetall(key);
        try {
            return val ?? null;
        } catch {
            return val as any;
        }
    }
    async delete(key: string[]): Promise<number> {
        return this.redis.del(key);
    }

    async lpush(key: string, ...values: string[]): Promise<number> {
        return this.redis.lpush(key, ...values);
    }

    async lrange(key: string, start: number, end: number): Promise<string[]> {
        return this.redis.lrange(key, start, end);
    }

    async hset(key: string, field: string, value: any): Promise<number> {
        const val = typeof value === 'object' ? JSON.stringify(value) : value;
        return this.redis.hset(key, field, val);
    }

    async hget(key: string, field: string): Promise<any> {
        const val = await this.redis.hget(key, field);
        try {
            return JSON.parse(val);
        } catch {
            return val;
        }
    }

    async exists(key: string): Promise<boolean> {
        return (await this.redis.exists(key)) === 1;
    }

    async ttl(key: string): Promise<number> {
        return this.redis.ttl(key);
    }

}
