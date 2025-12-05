import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class IParamsId {
  @ApiProperty({
    description: 'ID',
    example: '458723945-8547-4567-8547-456785478547',
    type: String,
  })
    @IsUUID()
    @IsNotEmpty({ message: 'ID is required' })
    @IsString({ message: 'ID must be a string' })
    id: string;
  }
  