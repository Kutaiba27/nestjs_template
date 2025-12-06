import { Account, AccountRole } from "@Modules/account/data";
import { ApiProperty } from "@nestjs/swagger";


export class GetAccountResponse {
    @ApiProperty({
        description: 'ID',
        example: '1234567890',
        type: String
    })
    id: string;
    @ApiProperty({
        description: 'Email',
        example: 'admin@example.com',
        type: String
    })
    email: string;
    @ApiProperty({
        description: 'First name',
        example: 'John',
        type: String
    })
    firstName: string;
    @ApiProperty({
        description: 'Last name',
        example: 'Doe',
        type: String
    })
    lastName: string;
    @ApiProperty({
        description: 'Is active',
        example: true,
        type: Boolean
    })
    isActive: boolean;
    @ApiProperty({
        description: 'Is verified',
        example: true,
        type: Boolean
    })
    isVerified: boolean;
    @ApiProperty({
        description: 'Account role',
        example: AccountRole.ADMIN,
        type: String
    })
    accountRole: AccountRole;
}

export function GetAccountResponseSchema(account: Account): GetAccountResponse {
    return {
        id: account.id,
        email: account.email,
        firstName: account.firstName ?? '',
        lastName: account.lastName ?? '',
        isActive: account.isActive ?? true,
        isVerified: account.isVerified ?? false,
        accountRole: account.accountRole,
    }
}