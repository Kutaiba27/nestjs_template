import { Transform } from "class-transformer";
import { isBoolean, IsBoolean, IsNumber, IsOptional, Max, Min } from "class-validator";


export class IPagination {
  limit?: number;
  skip?: number;
  needPagination?: boolean;
  total?: boolean;
}

export class PaginationRequest {
  @IsOptional()
  @IsNumber() 
  @Min(0)
  @Transform(({ value }) => +value)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => +value)
  limit?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => isBoolean(value) ? Boolean(value) : false)
  needPagination?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => isBoolean(value) ? Boolean(value) : false)
  total?: boolean;
}

export const paginationKeys: string[] = Object.keys(new PaginationRequest());

