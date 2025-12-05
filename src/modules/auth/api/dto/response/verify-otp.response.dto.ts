import { ApiProperty } from "@nestjs/swagger";


export class VerifyOTPResponseDto {
    @ApiProperty({
        description: 'Token',
        example: '1234567890',
        type: String
    })
    token: string
}