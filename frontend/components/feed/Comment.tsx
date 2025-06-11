'use client';

import type { CommentProps } from '@/types/comment.type';
import { CommentAuthor } from './CommentAuthor';

export function Comment({ comment }: CommentProps) {
  return (
    <div className="group relative">
      <CommentAuthor
        walletAddress={comment.walletAddress}
        username={comment.username}
        profilePicUrl={comment.profilePicUrl}
        timestamp={comment.timestamp}
      />
      <div className="mt-1 text-sm font-normal leading-relaxed text-gray-100 pl-11">
        {comment.content}
      </div>
      <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-800 group-hover:bg-gray-700 transition-colors"></div>
    </div>
  );
} 