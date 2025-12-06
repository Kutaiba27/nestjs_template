import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                name: 'short',
                ttl: 1000, // 1 second
                limit: 3, 
            },
            {
                name: 'medium',
                ttl: 10000, // 10 seconds
                limit: 20, 
            },
            {
                name: 'long',
                ttl: 60000, // 1 minute
                limit: 100, 
            },
        ]),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class RateLimitModule {}
