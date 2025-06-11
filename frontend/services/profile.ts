import API from './constant';
import type { Profile } from '@/types/profile.type';

export const getProfile = async (walletAddress: string): Promise<Profile> => {
  try {
    const response = await API.get(`/users/${walletAddress}`);

    const profile = {
      wallet_address: response.data.wallet_address,
      username: response.data.username || '',
      bio: response.data.bio || '',
      profile_pic_url: response.data.profile_pic_url || '',
    };

    return profile;
  } catch (error: any) {
    throw error;
  }
};

export const updateProfile = async (profile: Partial<Profile>): Promise<Profile> => {
  try {
    const response = await API.post('/users', profile);

    const updatedProfile = {
      wallet_address: response.data.wallet_address,
      username: response.data.username || '',
      bio: response.data.bio || '',
      profile_pic_url: response.data.profile_pic_url || '',
    };

    return updatedProfile;
  } catch (error: any) {
    throw error;
  }
};
