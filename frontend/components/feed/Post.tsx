'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';

import type { PostProps } from '@/types/post.type';
import { PostActions } from './PostActions';
import { PostAuthor } from './PostAuthor';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';
import { usePosts } from '@/hooks/usePosts';
import { useComments } from '@/hooks/useComments';

export function Post({
  id,
  content,
  walletAddress,
  timestamp,
  likes,
  comments: commentCount,
  hasLiked,
  username,
  profilePicUrl,
}: PostProps) {
  const { address } = useAccount();
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(commentCount);
  const { toggleLike, isTogglingLike } = usePosts();
  const { comments, isLoading, error, submitComment, isSubmitting } = useComments(id, {
    onCommentAdded: (newCount) => {
      setCommentsCount(newCount);
    },
    enabled: showComments,
  });

  const handleLike = () => {
    if (!address) return;
    toggleLike({ postId: id, walletAddress: address });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-black p-6 shadow-lg transition-all duration-200 hover:border-gray-700">
      <PostAuthor
        walletAddress={walletAddress}
        username={username}
        profilePicUrl={profilePicUrl}
        timestamp={timestamp}
      />
      <p className="mt-4 text-base font-normal leading-relaxed text-gray-100">{content}</p>
      <PostActions
        postId={id}
        likes={likes}
        comments={commentsCount}
        hasLiked={hasLiked}
        isLiking={isTogglingLike}
        onLike={handleLike}
        onToggleComments={toggleComments}
      />
      {showComments && (
        <div className="mt-6 space-y-6 border-t border-gray-800 pt-6">
          {address ? (
            <CommentInput 
              postId={id} 
              onCommentAdded={(newCount) => {
                setCommentsCount(newCount);
              }}
              submitComment={submitComment}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div className="rounded-lg border border-gray-800 bg-black p-4 text-center text-gray-600">
              Connect your wallet to join the conversation
            </div>
          )}
          <CommentList 
            comments={comments}
            isLoading={isLoading}
            error={error}
          />
        </div>
      )}
    </div>
  );
} 