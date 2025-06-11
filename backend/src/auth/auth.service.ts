import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  async verifySignature(message: string, signature: string, expectedAddress: string): Promise<boolean> {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
    } catch (error) {
      throw new UnauthorizedException('Invalid signature');
    }
  }

  generateNonce(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}