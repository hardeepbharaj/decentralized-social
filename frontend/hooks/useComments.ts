import { toast } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getComments, addComment } from '@/services/posts';
import type { CommentSubmission, CommentResponse, UseCommentsOptions } from '@/types/comment.type';

export function useComments(postId: number, options: UseCommentsOptions = {}) {
  const queryClient = useQueryClient();
  const queryKey = ['comments', postId] as const;

  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getComments(postId),
    enabled: options.enabled ?? false,
  });

  const { mutate: submitComment, isPending: isSubmitting } = useMutation<
    CommentResponse,
    Error,
    CommentSubmission
  >({
    mutationFn: async ({ content, walletAddress }) => {
      return addComment(postId, content, walletAddress);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
      toast.success('Comment added successfully!');
      options.onCommentAdded?.(data.commentCount);
    },
    onError: (error) => {
      toast.error('Failed to add comment. Please try again.');
      console.error('Comment submission error:', error);
    },
  });

  return {
    comments,
    isLoading,
    error,
    submitComment,
    isSubmitting,
  };
} 