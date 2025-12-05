import cookieParser from "cookie-parser"
import { EnvironmentService } from "@Infrastructure/config"
import { ICacheService } from "@Infrastructure/cache"
import { NestExpressApplication } from "@nestjs/platform-express"
import morgan from "morgan"
import { VersioningType } from "@nestjs/common"
export const nestConfig = async (app: NestExpressApplication, envService: EnvironmentService) => {
    app.enableCors({ 
        origin: "*",
        credentials: true,
    })
    app.use(cookieParser())
    app.use(morgan("dev"))
    app.setGlobalPrefix(envService.get("app.globalPrefix"))
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
        prefix: "v"
    })
    const cacheService = app.get(ICacheService)
    await cacheService.connect().then(() => {
        console.log("🔌 Redis connected")
    }).catch(async (error) => {
        console.log("🚫 Redis connection failed", error)
        await app.close()
    })
}