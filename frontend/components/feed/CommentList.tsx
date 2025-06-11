'use client';

import type { CommentListProps } from '@/types/comment.type';
import { Comment as CommentComponent } from './Comment';

export function CommentList({ comments, isLoading, error }: CommentListProps) {
  if (error) {
    return (
      <div className="text-center font-light text-red-400 py-4">
        Failed to load comments. Please try again.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center font-light text-gray-400 py-4">
        Loading comments...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center font-light text-gray-400 py-4">
        No comments yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
} 