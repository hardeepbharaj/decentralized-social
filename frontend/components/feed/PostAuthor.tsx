'use client';

import { DEFAULT_PROFILE_IMAGE } from '@/utils/constants';
import { formatAddress } from '@/utils/format';
import type { PostAuthorProps } from '@/types/post.type';

export function PostAuthor({ walletAddress, username, profilePicUrl, timestamp }: PostAuthorProps) {
  const displayName = username || formatAddress(walletAddress);

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          src={profilePicUrl || DEFAULT_PROFILE_IMAGE}
          alt={displayName}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = DEFAULT_PROFILE_IMAGE;
          }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium text-gray-100">
          {displayName}
        </p>
        <p className="mt-1 text-sm font-light text-gray-400">
          {new Date(timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
} 