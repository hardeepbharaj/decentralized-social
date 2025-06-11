import type { UseMutateFunction } from '@tanstack/react-query';

export interface Comment {
  id: number;
  content: string;
  walletAddress: string;
  timestamp: string;
  username?: string;
  profilePicUrl?: string;
}

export interface CommentSubmission {
  content: string;
  walletAddress: string;
}

export interface CommentResponse {
  commentCount: number;
  comment: Comment;
}

export interface CommentAuthor {
  walletAddress: string;
  username?: string;
  profilePicUrl?: string;
} 

export interface UseCommentsOptions {
  onCommentAdded?: (commentCount: number) => void;
  enabled?: boolean;
}

export interface CommentProps {
  comment: Comment;
}

export interface CommentAuthorProps extends CommentAuthor {
  timestamp: string;
}

export interface CommentInputProps {
  postId: number;
  onCommentAdded: (newCount: number) => void;
  submitComment: UseMutateFunction<any, Error, CommentSubmission>;
  isSubmitting: boolean;
}

export interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
  error: Error | null;
}