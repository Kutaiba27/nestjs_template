import { CashModule } from "./cache"
import { EnvConfigModule, WinstonLogger } from "./config"
import { MongoConnection } from "./database"
import { QueueModule } from "./queue"
import { RateLimitModule } from "./rate-limit"

export * from "./cache"
export * from "./config"
export * from "./database"
export * from "./queue"
export * from "./rate-limit"

export const InfrastructureModule = [
    EnvConfigModule,
    CashModule,
    QueueModule,
    MongoConnection,
    WinstonLogger,
    RateLimitModule,
]