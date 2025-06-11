export interface Post {
  id: number;
  content: string;
  walletAddress: string;
  timestamp: string;
  likes: number;
  comments: number;
  hasLiked: boolean;
  username?: string;
  profilePicUrl?: string;
}

export interface PostSubmission {
  content: string;
  walletAddress: string;
}

export interface PostResponse {
  post: Post;
}

export interface LikeResponse {
  liked: boolean;
  likeCount: number;
}

export interface UsePostsOptions {
  onPostAdded?: () => void;
  onLikeToggled?: () => void;
  walletAddress?: string;
}

export interface PostProps extends Post {
  onUpdate?: () => Promise<void>;
}

export interface PostActionsProps {
  postId: number;
  likes: number;
  comments: number;
  hasLiked: boolean;
  isLiking: boolean;
  onLike: () => void;
  onToggleComments: () => void;
}

export interface PostAuthorProps {
  walletAddress: string;
  username?: string;
  profilePicUrl?: string;
  timestamp: string;
}

export interface PostComposerProps {
  onPostCreated?: () => void;
}