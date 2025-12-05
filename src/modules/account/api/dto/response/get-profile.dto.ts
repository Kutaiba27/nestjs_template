import { Account } from "@Modules/account/data";
import { ApiProperty } from "@nestjs/swagger";


export class GetProfileResponseDto {
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
}

export function GetProfileResponse(account: Account): GetProfileResponseDto {
    return {
        id: account.id,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
    }
}