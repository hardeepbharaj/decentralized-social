'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

import { createPost } from '@/services/posts';
import { DEFAULT_PROFILE_IMAGE } from '@/utils/constants';
import { useProfile } from '@/contexts/ProfileContext';
import { formatAddress } from '@/utils/format';
import { handleError } from '@/utils/error';
import { Button } from '@/components/common/Button';
import type { PostComposerProps } from '@/types/post.type';


export function PostComposer({ onPostCreated }: PostComposerProps) {
  const { address } = useAccount();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();

  const displayName = profile?.username || formatAddress(address || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      toast.error('Please connect your wallet to create posts');
      return;
    }

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      toast.error('Please enter some content for your post');
      return;
    }

    if (trimmedContent.length > 280) {
      toast.error('Post content must be less than 280 characters');
      return;
    }

    try {
      setIsLoading(true);
      await createPost(trimmedContent, address);
      setContent('');
      toast.success('Post created successfully!');
      onPostCreated?.();
    } catch (error) {
      handleError(error, 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-black p-6 shadow-lg transition-all duration-200 hover:border-gray-700">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <img
            src={profile?.profile_pic_url || DEFAULT_PROFILE_IMAGE}
            alt={displayName}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-800"
          />
        </div>
        <div className="min-w-0 flex-1">
          <form onSubmit={handleSubmit}>
            <div>
              <textarea
                rows={3}
                name="content"
                id="content"
                className="block w-full resize-none rounded-md border border-gray-800 bg-black p-4 text-sm text-gray-100 shadow-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  {content.length}/280
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => setContent('')}
                    isRounded={false}
                    size="md"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !content.trim()}
                    isRounded={false}
                    size="md"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 