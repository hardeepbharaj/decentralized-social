import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class LikePostDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Invalid wallet address format',
  })
  wallet_address: string;
} 