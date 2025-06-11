export interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  refetchProfile: () => Promise<void>;
}

export interface Profile {
  wallet_address: string;
  username: string;
  bio: string;
  profile_pic_url: string;
}

export interface ProfileFormData {
  username: string;
  bio: string;
  profile_pic_url: string;
}