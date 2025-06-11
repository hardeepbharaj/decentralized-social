import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('verify')
  async verify(@Body() body: { message: string; signature: string; address: string }) {
    try {
      const isValid = await this.authService.verifySignature(
        body.message,
        body.signature,
        body.address
      );
      
      if (!isValid) {
        throw new UnauthorizedException('Invalid signature');
      }
      
      return { success: true, address: body.address };
    } catch (error) {
      throw error;
    }
  }

  @Post('nonce')
  getNonce() {
    return { nonce: this.authService.generateNonce() };
  }
}