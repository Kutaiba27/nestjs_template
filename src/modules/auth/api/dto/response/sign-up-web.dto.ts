import { AccountRole } from "@Modules/account/data";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpWebResponseDto {
    @ApiProperty({
        description: 'Token',
        example: '1234567890',
        type: String
    })
    token: string;

    @ApiProperty({
        description: 'Full name',
        example: 'John Doe',
        type: String
    })
    fullName: string;

    @ApiProperty({
        description: 'Account role',
        example: AccountRole.ADMIN,
        enum: AccountRole
    })
    accountRole: AccountRole;

    @ApiProperty({
        description: 'Is verified',
        example: true,
        type: Boolean
    })
    isVerified: boolean;
}