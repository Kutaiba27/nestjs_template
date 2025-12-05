import { IsPassword } from "@Package/api/validation";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class ChangePasswordRequestDto { 

    @ApiProperty({
        description: 'New password',
        example: 'Password123',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsPassword()
    newPassword: string;
}