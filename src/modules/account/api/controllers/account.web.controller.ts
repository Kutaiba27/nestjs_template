import { Body } from "@nestjs/common";
import { AuthWebController, GetMethod, PutMethod, Account } from "@Package/api";
import { IAccountWebService } from "@Modules/account/behavior";
import { AccountPayload } from "@Package/auth";
import { GetAccountResponse, GetAccountResponseSchema } from "../dto/response/get-account.dto";
import { UpdateProfileRequestDto } from "../dto/request/update-profile.dto";
import { ChangePasswordRequestDto } from "../dto/request/change-password.dto";
import { GetProfileResponse, GetProfileResponseDto } from "../dto/response";

@AuthWebController({
    prefix: 'account',
})
export class AccountWebController {
    constructor(
        private readonly accountWebService: IAccountWebService,
    ) {}

    @GetMethod({
        path: "profile",
        responseType: GetProfileResponseDto,
    })
    async getProfile(
        @Account() account: AccountPayload,
    ): Promise<GetProfileResponseDto> {
        const accountEntity = await this.accountWebService.findOne(account.id);
        return GetProfileResponse(accountEntity);
    }

    @PutMethod({
        path: "profile",
    })
    async updateProfile(
        @Body() updateProfileRequestDto: UpdateProfileRequestDto,
        @Account() account: AccountPayload,
    ): Promise<void> {
        const updatedAccount = await this.accountWebService.update(account.id, {
            firstName: updateProfileRequestDto.firstName,
            lastName: updateProfileRequestDto.lastName,
        });
    }

    @PutMethod({
        path: "change-password",
    })
    async changePassword(
        @Body() changePasswordRequestDto: ChangePasswordRequestDto,
        @Account() account: AccountPayload,
    ): Promise<void> {
        await this.accountWebService.changePassword(account.id, changePasswordRequestDto.newPassword);
        return;
    }
}
