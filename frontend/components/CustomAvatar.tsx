
'use client';

import { useState, useEffect } from 'react';
import { AvatarComponent } from '@rainbow-me/rainbowkit';

import { getProfile } from '@/services/profile';

const CustomAvatar: AvatarComponent = ({ address, size }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(address);
        if (profile?.profile_pic_url) {
          setAvatarUrl(profile.profile_pic_url);
        }
        if (profile?.username) {
          setUsername(profile.username);
        }
        setError(null);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Failed to load profile');
        setAvatarUrl(null);
        setUsername(null);
      }
    };

    fetchProfile();
  }, [address]);

  if (error) {
    return (
      <div 
        style={{ 
          width: size, 
          height: size, 
          borderRadius: 999,
          backgroundColor: '#ff4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.3,
          color: 'white',
          textAlign: 'center'
        }}
        title={error}
      >
        !
      </div>
    );
  }

  if (!avatarUrl) return null;

  return (
    <img
      src={avatarUrl}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt={username || `${address} avatar`}
    />
  );
};

export default CustomAvatar;