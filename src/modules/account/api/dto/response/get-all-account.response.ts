import { Account } from "@Modules/account/data";
import { ApiProperty } from "@nestjs/swagger";


export class GetAllAccountResponse {
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
}

export class GetAllAccountResponseData {
    @ApiProperty({
        description: 'Data',
        type: [GetAllAccountResponse]
    })
    data: GetAllAccountResponse[];
    @ApiProperty({
        description: 'Total',
        example: 100,
        type: Number
    })
    total: number;
}
export function GetAllAccountResponseSchema(account: Account[]): GetAllAccountResponse[] {
    return account.map(account => ({
        id: account.id,
        email: account.email,
        firstName: account.firstName || "",
        lastName: account.lastName || "",
        isActive: account.isActive || false,
    }));
}