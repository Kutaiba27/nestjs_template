import { ApiProperty } from "@nestjs/swagger";
import { IsPassword } from "@Package/api/validation";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginRequestDto {
    @ApiProperty({
        description: 'Email',
        example: 'admin@example.com',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
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