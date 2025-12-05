import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class VerifyOTPRequestDto {
    @ApiProperty({
        description: 'OTP',
        example: '12345',
        type: String
    })
    @IsString()
    @MinLength(5)
    @MaxLength(5)
    @Matches(/^\d+$/)
    @IsNotEmpty()
    otp: string;
}
