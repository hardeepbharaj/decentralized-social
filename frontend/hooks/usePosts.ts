import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost, likePost } from '@/services/posts';
import { toast } from 'react-hot-toast';
import type { Post, PostSubmission, LikeResponse, UsePostsOptions } from '@/types/post.type';

export function usePosts(options: UsePostsOptions = {}) {
  const queryClient = useQueryClient();
  const queryKey = ['posts', options.walletAddress] as const;

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey,
    queryFn: () => getPosts(options.walletAddress)
  });

  const { mutate: submitPost, isPending: isSubmittingPost } = useMutation({
    mutationFn: async ({ content, walletAddress }: PostSubmission) => {
      return createPost(content, walletAddress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success('Post created successfully!');
      options.onPostAdded?.();
    },
    onError: (error) => {
      toast.error('Failed to create post. Please try again.');
      console.error('Post submission error:', error);
    },
  });

  const { mutate: toggleLike, isPending: isTogglingLike } = useMutation<
    LikeResponse,
    Error,
    { postId: number; walletAddress: string }
  >({
    mutationFn: async ({ postId, walletAddress }) => {
      return likePost(postId, walletAddress);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Post[]>(queryKey, (oldPosts) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.map((post) =>
          post.id === variables.postId
            ? { ...post, hasLiked: data.liked, likes: data.likeCount }
            : post
        );
      });
      options.onLikeToggled?.();
    },
    onError: (error, variables) => {
      queryClient.invalidateQueries({ queryKey });
      toast.error('Failed to update like. Please try again.');
      console.error('Like toggle error:', error);
    },
  });

  return {
    posts,
    isLoading,
    error,
    submitPost,
    isSubmittingPost,
    toggleLike,
    isTogglingLike,
  };
} 