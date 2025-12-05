import { CashModule } from "./cache"
import { EnvConfigModule, WinstonLogger } from "./config"
import { MongoConnection } from "./database"
import { QueueModule } from "./queue"

export * from "./cache"
export * from "./config"
export * from "./database"
export * from "./queue" 

export const InfrastructureModule = [
    EnvConfigModule,
    CashModule,
    QueueModule,
    MongoConnection,
    WinstonLogger,
]