import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class ForgotPasswordRequestDto {
    @ApiProperty({
        description: 'Email',
        example: 'test@example.com',
        type: String
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()   
    email: string;
}