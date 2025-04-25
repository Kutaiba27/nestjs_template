import { IsString, IsDate, IsArray, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  members?: string[];

  @IsOptional()
  settings?: {
    notifications?: boolean;
    autoSave?: boolean;
    theme?: string;
  };
} 