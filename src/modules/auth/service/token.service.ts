import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { ICacheService } from "@Infrastructure/cache";
import { EnvironmentService } from "@Infrastructure/config";
import { Account } from "@Modules/account";
import { AccountPayload } from "@Package/auth";
import { RedisTTL } from "@Common/cache";
import { ITokenService } from "../behavior/token.behavior.service";

@Injectable()
export class TokenService implements ITokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly cacheService: ICacheService,
        private readonly environmentService: EnvironmentService,
    ) {}

    async generateAndCache(payload: AccountPayload): Promise<string> {
        const expiresIn = this.environmentService.get("jwt.jwtExpiredAccess");
        const token = this.jwtService.sign(
            { ...payload },
            { expiresIn } as JwtSignOptions
        );
        await this.cacheService.set({
            key: payload.id,
            value: token,
            ttl: RedisTTL.SESSION_TOKEN
        });
        return token;
    }

    buildPayload(account: Account, overrides?: Partial<AccountPayload>): AccountPayload {
        return {
            id: account.id,
            email: account.email,
            accountRole: account.accountRole,
            isVerified: account.isVerified ?? false,
            isActive: account.isActive ?? true,
            ...overrides
        };
    }

    async invalidate(userId: string): Promise<void> {
        await this.cacheService.delete([userId]);
    }
}
