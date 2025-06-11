import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findByWallet(wallet_address: string): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { wallet_address } });
    
    if (!user) {
      user = await this.createOrUpdate({
        wallet_address,
        username: '',
        bio: '',
        profile_pic_url: '',
      });
    }
    
    return user;
  }

  async createOrUpdate(userData: Partial<User>): Promise<User> {
    if (!userData.wallet_address) {
      throw new Error('wallet_address is required');
    }

    try {
      const user = await this.usersRepository.findOne({ 
        where: { wallet_address: userData.wallet_address } 
      });
      
      if (user) {
        if (userData.username !== undefined) user.username = userData.username;
        if (userData.bio !== undefined) user.bio = userData.bio;
        if (userData.profile_pic_url !== undefined) user.profile_pic_url = userData.profile_pic_url;
        
        return await this.usersRepository.save(user);
      }
      
      const newUser = this.usersRepository.create({
        wallet_address: userData.wallet_address,
        username: userData.username || '',
        bio: userData.bio || '',
        profile_pic_url: userData.profile_pic_url || '',
      });
      
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }
}