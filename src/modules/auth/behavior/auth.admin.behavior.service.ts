import { LoginRequestDto } from "../api/dto/request";
import { LoginResponseDto } from "../api/dto/response";
import { AccountPayload } from "@Package/auth";

export abstract class IAuthAdminService {
    abstract login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto>;
    abstract logout(account: AccountPayload): Promise<void>;
}