'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { updateProfile } from '@/services/profile';
import { DEFAULT_PROFILE_IMAGE } from '@/utils/constants';
import { useProfile } from '@/contexts/ProfileContext';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import type { ProfileFormData } from '@/types/profile.type';

export default function Profile() {
  const { address } = useAccount();
  const { profile, refetchProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    bio: '',
    profile_pic_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
      setIsLoading(true);
      await updateProfile({
        wallet_address: address,
        ...formData,
      });
      await refetchProfile();
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!address) return;
    
    const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
    if (!confirmed) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${address}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      await refetchProfile();
      toast.success('Profile deleted successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to delete profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="mx-auto max-w-3xl rounded-xl border border-gray-800 bg-black p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Username"
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />

              <Input
                label="Bio"
                id="bio"
                name="bio"
                multiline
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />

              <Input
                label="Profile Picture URL"
                id="profilePicUrl"
                name="profilePicUrl"
                type="text"
                value={formData.profile_pic_url}
                onChange={(e) => setFormData({ ...formData, profile_pic_url: e.target.value })}
              />

              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  isRounded={false}
                  size="md"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  isRounded={false}
                  size="md"
                >
                  Save Profile
                </Button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-6 flex items-center space-x-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-gray-700">
                  <img
                    src={profile?.profile_pic_url || DEFAULT_PROFILE_IMAGE}
                    alt={profile?.username || 'Profile picture'}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-100">
                    {profile?.username || 'Profile'}
                  </h2>
                </div>
              </div>

              {profile?.bio && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400">Bio</h3>
                  <p className="mt-1 text-gray-100">{profile.bio}</p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button
                  onClick={() => {
                    setIsEditing(true);
                    setFormData({
                      username: profile?.username || '',
                      bio: profile?.bio || '',
                      profile_pic_url: profile?.profile_pic_url || '',
                    });
                  }}
                  isRounded={false}
                  size="md"
                >
                  Edit Profile
                </Button>

                <Button
                  onClick={handleDelete}
                  variant="secondary"
                  disabled={isLoading}
                  isRounded={false}
                  size="md"
                >
                  Delete Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 