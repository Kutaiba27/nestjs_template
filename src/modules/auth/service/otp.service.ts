import { Injectable } from "@nestjs/common";
import { ICacheService } from "@Infrastructure/cache";
import { generateOTP } from "@Package/utilities";
import { RedisKeys, RedisTTL } from "@Common/cache";
import { IOTPService } from "../behavior/otp.behavior.service";

@Injectable()
export class OTPService implements IOTPService {
    constructor(
        private readonly cacheService: ICacheService,
    ) {}

    generate(): string {
        return generateOTP();
    }

    async store(email: string): Promise<string> {
        const otp = this.generate();
        await this.cacheService.set({
            key: `${RedisKeys.OTP}:${email}`,
            value: otp,
            ttl: RedisTTL.OTP
        });
        return otp;
    }

    async get(email: string): Promise<string | null> {
        return this.cacheService.get<string>(`${RedisKeys.OTP}:${email}`);
    }

    async verify(email: string, otp: string): Promise<boolean> {
        const storedOtp = await this.get(email);
        if (!storedOtp) return false;
        return storedOtp.toString() === otp;
    }

    async delete(email: string): Promise<void> {
        await this.cacheService.delete([`${RedisKeys.OTP}:${email}`]);
    }
}
