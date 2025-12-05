import { ApiProperty } from "@nestjs/swagger";

export class UpdateAccountDto {
    @ApiProperty({
        description: 'Email',
        example: 'admin@example.com',
        type: String
    })
    email?: string;
    @ApiProperty({
        description: 'Phone number',
        example: '+1234567890',
        type: String
    })
    phoneNumber?: string;
    @ApiProperty({
        description: 'First name',
        example: 'John',
        type: String
    })
    firstName?: string;
    @ApiProperty({
        description: 'Last name',
        example: 'Doe',
        type: String
    })
    lastName?: string;
}