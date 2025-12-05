import { IsPassword } from "@Package/api/validation";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";


export class CreateAccountAdminDto {
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
        description: 'Phone number',
        example: '+1234567890',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;
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