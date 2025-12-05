import { Body, Param } from "@nestjs/common";

import { IAccountAdminService } from "@Modules/account/behavior";
import { AdminController, DeletePolicy, GetPolicy, IPagination, IParamsId, Pagination, PostPolicy, PutPolicy, Queries } from "@Package/api";
import { CreateAccountAdminDto } from "../dto/request/create-account.admin.dto";
import { GetAllAccountResponseData, GetAllAccountResponseSchema } from "../dto/response/get-all-account.response";
import { GetAllAccountsDto } from "../dto/request/get-all-accounts.dto";
import { GetAccountResponse, GetAccountResponseSchema } from "../dto/response/get-account.dto";
import { UpdateAccountDto } from "../dto/request/update-account.dto";
import { AccountRole } from "@Modules/account/data";


@AdminController({
    prefix: 'account',
})
export class AccountAdminController {
    constructor(
        private readonly accountAdminService: IAccountAdminService
    ) {}

    @PostPolicy({ path: '', role: [AccountRole.ADMIN] })
    async create(@Body() account: CreateAccountAdminDto): Promise<void> {
        await this.accountAdminService.create(account);
        return;
    }
    
    @GetPolicy({ path: '', role: [AccountRole.ADMIN] })
    async getAll(
        @Pagination() pagination: IPagination,
        @Queries() query: GetAllAccountsDto
    ): Promise<GetAllAccountResponseData> {
        const data = await this.accountAdminService.findAll(query, pagination);
        return {
            data: GetAllAccountResponseSchema(data.data),
            total: data.total,
        }
    }

    @GetPolicy({ path: ':id', role: [AccountRole.ADMIN] })
    async getOne(@Param() id: IParamsId): Promise<GetAccountResponse> {
        const account = await this.accountAdminService.findOne(id.id);
        return GetAccountResponseSchema(account);
    }

    @PutPolicy({ path: ':id', role: [AccountRole.ADMIN] })
    async updateAccount(
        @Body() accountData: UpdateAccountDto,
        @Param() id: IParamsId
    ): Promise<void> {
        await this.accountAdminService.update(id.id, accountData);
        return;
    }

    @DeletePolicy({ path: ':id', role: [AccountRole.ADMIN] })
    async deleteAccount(
        @Param() id: IParamsId
    ): Promise<void> {
        await this.accountAdminService.remove(id.id);
        return;
    }
}