'use client';

import { DEFAULT_PROFILE_IMAGE } from '@/utils/constants';
import { formatAddress } from '@/utils/format';
import type { CommentAuthorProps } from '@/types/comment.type';

export function CommentAuthor({ walletAddress, username, profilePicUrl, timestamp }: CommentAuthorProps) {
  const displayName = username || formatAddress(walletAddress);

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <img
          src={profilePicUrl || DEFAULT_PROFILE_IMAGE}
          alt={displayName}
          className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = DEFAULT_PROFILE_IMAGE;
          }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-100">
            {displayName}
          </span>
          <span className="text-xs font-light text-gray-400">•</span>
          <span className="text-xs font-light text-gray-400">
            {new Date(timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
} 