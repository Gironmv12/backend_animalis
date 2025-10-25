import { IsOptional, IsISO8601, IsInt, Min } from 'class-validator';

export class PeriodFilterDto {
  @IsOptional()
  @IsISO8601()
  start?: string;

  @IsOptional()
  @IsISO8601()
  end?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
