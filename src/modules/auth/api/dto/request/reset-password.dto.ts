import { ApiProperty } from "@nestjs/swagger";
import { IsPassword } from "@Package/api/validation";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordRequestDto {  
    @ApiProperty({
        description: 'Password',
        example: 'Password123',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsPassword()
    password: string;
}