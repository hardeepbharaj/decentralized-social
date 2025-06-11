import { IsOptional, IsInt, Min, Max, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class GetFeedDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Invalid wallet address format',
  })
  wallet_address?: string;
} 