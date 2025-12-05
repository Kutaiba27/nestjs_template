import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfileRequestDto {
    @ApiProperty({
        description: 'First name',
        example: 'John',
        type: String,
        required: false,
    })
    firstName?: string;

    @ApiProperty({
        description: 'Last name',
        example: 'Doe',
        type: String,
        required: false,
    })
    lastName?: string;
}


