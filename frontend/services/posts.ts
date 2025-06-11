import API from './constant';
import type { Post } from '@/types/post.type';
import type { Comment } from '@/types/comment.type';

/**
 * Fetches posts from the backend with optional wallet address for like status
 * @param walletAddress - Optional wallet address to check if posts are liked by the user
 * @returns Array of posts with like status and counts
 */
export const getPosts = async (walletAddress?: string): Promise<Post[]> => {
  try {
    const response = await API.get('/posts', {
      params: {
        wallet_address: walletAddress,
      },
    });

    // Transform backend response to frontend Post type
    const posts = response.data.map((post: any) => ({
      id: post.id,
      content: post.content,
      walletAddress: post.wallet_address,
      timestamp: post.timestamp,
      likes: post.like_count || 0,
      comments: post.comment_count || 0,
      hasLiked: Boolean(post.is_liked),
      username: post.user?.username,
      profilePicUrl: post.user?.profile_pic_url,
    }));

    return posts;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Creates a new post
 * @param content - Post content
 * @param walletAddress - User's wallet address
 * @returns Created post data
 */
export const createPost = async (content: string, walletAddress: string): Promise<Post> => {
  try {
    const response = await API.post('/posts', {
      content,
      wallet_address: walletAddress,
    });

    return {
      id: response.data.id,
      content: response.data.content,
      walletAddress: response.data.wallet_address,
      timestamp: response.data.created_at,
      likes: 0,
      comments: 0,
      hasLiked: false,
      username: response.data.user?.username,
      profilePicUrl: response.data.user?.profile_pic_url,
    };
  } catch (error: any) {
    throw error;
  }
};

/**
 * Toggles like status for a post
 * @param postId - ID of the post to like/unlike
 * @param walletAddress - User's wallet address
 * @returns Updated like status and count
 */
export const likePost = async (postId: number, walletAddress: string): Promise<{ liked: boolean; likeCount: number }> => {
  const response = await API.post(`/posts/${postId}/like`, { wallet_address: walletAddress });
  return {
    liked: response.data.liked,
    likeCount: response.data.likeCount,
  };
};

/**
 * Adds a comment to a post
 * @param postId - ID of the post to comment on
 * @param content - Comment content
 * @param walletAddress - User's wallet address
 * @returns Created comment and updated comment count
 */
export const addComment = async (postId: number, content: string, walletAddress: string): Promise<{ comment: Comment; commentCount: number }> => {
  try {
    const response = await API.post(`/posts/${postId}/comment`, {
      content,
      wallet_address: walletAddress,
    });

    return {
      comment: {
        id: response.data.comment.id,
        content: response.data.comment.content,
        walletAddress: response.data.comment.wallet_address,
        timestamp: response.data.comment.timestamp,
        username: response.data.comment.user?.username,
        profilePicUrl: response.data.comment.user?.profile_pic_url,
      },
      commentCount: response.data.commentCount,
    };
  } catch (error: any) {
    throw error;
  }
};

/**
 * Fetches comments for a post
 * @param postId - ID of the post to get comments for
 * @returns Array of comments
 */
export const getComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await API.get(`/posts/${postId}/comments`);
    return response.data.map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      walletAddress: comment.wallet_address,
      timestamp: comment.timestamp,
      username: comment.user?.username,
      profilePicUrl: comment.user?.profile_pic_url,
    }));
  } catch (error: any) {
    throw error;
  }
};

export const getFeed = async (page = 1, limit = 10, currentWalletAddress?: string): Promise<Post[]> => {
  try {
    const response = await API.get('/posts', {
      params: {
        page,
        limit,
        wallet_address: currentWalletAddress,
      },
    });

    return response.data.map((post: any) => ({
      id: post.id,
      content: post.content,
      walletAddress: post.wallet_address,
      timestamp: post.timestamp,
      likes: post.like_count || 0,
      comments: post.comment_count || 0,
      hasLiked: post.is_liked || false,
      username: post.user?.username,
      profilePicUrl: post.user?.profile_pic_url,
    }));
  } catch (error: any) {
    throw error;
  }
}; 