import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsPassword } from "@Package/api/validation";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpWebRequestDto {
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
    @ApiProperty({
        description: 'First name',
        example: 'John',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @ApiProperty({
        description: 'Last name',
        example: 'Doe',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;
}