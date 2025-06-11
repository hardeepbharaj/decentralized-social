import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 280, { message: 'Content must be between 1 and 280 characters' })
  content: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Invalid wallet address format',
  })
  wallet_address: string;
} 