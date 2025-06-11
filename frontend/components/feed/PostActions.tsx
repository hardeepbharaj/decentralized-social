'use client';

import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

import type { PostActionsProps } from '@/types/post.type';

export function PostActions({
  postId,
  likes,
  comments,
  hasLiked,
  isLiking,
  onLike,
  onToggleComments,
}: PostActionsProps) {
  const { address } = useAccount();

  const handleLike = () => {
    if (!address) {
      toast.error('Please connect your wallet to like posts');
      return;
    }
    onLike();
  };

  return (
    <div className="mt-4 flex items-center space-x-6">
      <button
        type="button"
        onClick={handleLike}
        disabled={isLiking || !address}
        className={`group flex items-center space-x-2 text-sm ${
          address 
            ? 'text-gray-400 transition-colors hover:text-blue-500 cursor-pointer' 
            : 'text-gray-600 cursor-not-allowed'
        }`}
      >
        <HeartIcon
          className={`h-5 w-5 transition-all group-hover:text-blue-500 ${
            hasLiked ? 'fill-blue-500 text-blue-500' : address ? 'text-gray-400' : 'text-gray-600'
          } ${address ? 'group-hover:scale-110' : ''}`}
        />
        <span>{likes}</span>
      </button>
      <button
        type="button"
        onClick={onToggleComments}
        className="group flex items-center space-x-2 text-sm text-gray-400 transition-colors hover:text-blue-500 cursor-pointer"
      >
        <ChatBubbleLeftIcon 
          className="h-5 w-5 transition-all text-gray-400 group-hover:scale-110 group-hover:text-blue-500"
        />
        <span>{comments}</span>
      </button>
    </div>
  );
} 