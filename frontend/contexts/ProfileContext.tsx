'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import type { Profile, ProfileContextType } from '@/types/profile.type';
import { getProfile } from '@/services/profile';

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: false,
  refetchProfile: async () => {},
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!address) {
      setProfile(null);
      return;
    }

    try {
      setLoading(true);
      const data = await getProfile(address);
      setProfile(data);
    } catch (err) {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [address]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        refetchProfile: fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
} 