'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/common/Button';
import type { CommentInputProps } from '@/types/comment.type';

const MAX_COMMENT_LENGTH = 280;

export function CommentInput({ submitComment, isSubmitting }: CommentInputProps) {
  const { address } = useAccount();
  const [content, setContent] = useState('');

  const isContentValid = content.trim().length > 0 && content.length <= MAX_COMMENT_LENGTH;
  const remainingChars = MAX_COMMENT_LENGTH - content.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      toast.error('Please connect your wallet to comment');
      return;
    }

    if (!isContentValid) {
      if (content.trim().length === 0) {
        toast.error('Please enter some content for your comment');
      } else {
        toast.error(`Comment must be less than ${MAX_COMMENT_LENGTH} characters`);
      }
      return;
    }

    submitComment({ content: content.trim(), walletAddress: address });
    setContent(''); // Clear the input after submission
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          rows={3}
          name="content"
          id="content"
          className="block w-full resize-none rounded-xl border border-gray-800 bg-black p-4 text-base text-gray-100 shadow-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition-all duration-200"
          placeholder="What are your thoughts?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="mt-2 flex items-center justify-between">
          <div className={`text-xs ${remainingChars < 0 ? 'text-red-400' : 'text-gray-400'}`}>
            {remainingChars} characters remaining
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setContent('')}
              isRounded={false}
              size="md"
              disabled={!content || isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isContentValid || isSubmitting}
              isRounded={false}
              size="md"
            >
              {isSubmitting ? 'Posting...' : 'Comment'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 