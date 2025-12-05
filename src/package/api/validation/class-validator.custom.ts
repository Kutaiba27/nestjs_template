import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";

export const IsPhoneNumber = () => applyDecorators(
    IsString(),
    Matches(/^\+[1-9]\d{1,14}$/, { message: 'Invalid phone number format' }),
    ApiProperty({
        description: 'Phone number',
        example: '+1234567890',
        type: String
    })
);

export const IsPassword = () => applyDecorators(
    IsString(),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Invalid password format' }),
    ApiProperty({
        description: 'Password',
        example: 'Password123',
        type: String
    })
);