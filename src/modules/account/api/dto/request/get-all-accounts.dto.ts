import { ApiProperty } from "@nestjs/swagger";
import { PaginationRequest } from "@Package/api";


export class GetAllAccountsDto extends PaginationRequest {
    @ApiProperty({
        description: 'Search',
        example: 'John Doe',
        type: String
    })
    search?: string;
}