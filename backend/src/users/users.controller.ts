import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':wallet')
  async getUserByWallet(@Param('wallet') wallet: string): Promise<User> {
    try {
      return await this.usersService.findByWallet(wallet);
    } catch (error) {
      throw new HttpException(
        'Error retrieving user profile',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  async createOrUpdateUser(@Body() userData: Partial<User>): Promise<User> {
    try {
      if (!userData.wallet_address) {
        throw new HttpException('wallet_address is required', HttpStatus.BAD_REQUEST);
      }

      return await this.usersService.createOrUpdate(userData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error processing user data',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}