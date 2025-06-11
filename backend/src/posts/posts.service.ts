import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>
  ) {}

  private validateWalletAddress(wallet_address: string) {
    if (!wallet_address) {
      throw new BadRequestException('Wallet address is required');
    }
    
    // Check if it's a valid Ethereum address format (0x followed by 40 hex characters)
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(wallet_address)) {
      throw new BadRequestException('Invalid wallet address format');
    }
  }

  /**
   * Creates a new post
   * @param wallet_address - User's wallet address
   * @param content - Post content
   * @throws BadRequestException if content is empty or too long
   */
  async createPost(wallet_address: string, content: string): Promise<Post> {
    this.validateWalletAddress(wallet_address);

    if (!content?.trim()) {
      throw new BadRequestException('Content cannot be empty');
    }
    if (content.length > 280) {
      throw new BadRequestException('Content must be less than 280 characters');
    }

    const post = this.postsRepository.create({ wallet_address, content });
    return this.postsRepository.save(post);
  }

  /**
   * Gets feed of posts with like and comment counts
   * @param page - Page number for pagination
   * @param limit - Number of posts per page
   * @param currentWalletAddress - Current user's wallet address to check like status
   */
  async getFeed(page: number = 1, limit: number = 20, currentWalletAddress?: string): Promise<Post[]> {
    try {
      const validPage = Math.max(1, Math.floor(Number(page)));
      const validLimit = Math.min(100, Math.max(1, Math.floor(Number(limit))));
      
      const posts = await this.postsRepository
        .find({
          relations: ['user'],
          order: { timestamp: 'DESC' },
          skip: (validPage - 1) * validLimit,
          take: validLimit,
        });

      const enhancedPosts = await Promise.all(
        posts.map(async (post) => {
          try {
            const likeCount = await this.likesRepository.count({
              where: { post_id: post.id }
            });

            const commentCount = await this.commentsRepository.count({
              where: { post_id: post.id }
            });

            let isLiked = false;
            if (currentWalletAddress) {
              const likeRecord = await this.likesRepository.findOne({
                where: { post_id: post.id, wallet_address: currentWalletAddress }
              });
              isLiked = !!likeRecord;
            }

            return {
              ...post,
              like_count: likeCount,
              comment_count: commentCount,
              is_liked: isLiked
            };
          } catch (error) {
            console.error(`Error processing post ${post.id}:`, error);
            return {
              ...post,
              like_count: 0,
              comment_count: 0,
              is_liked: false
            };
          }
        })
      );

      return enhancedPosts;
      
    } catch (error) {
      console.error('Detailed error in getFeed:', {
        error: error.message,
        stack: error.stack,
        query: error.query,
        parameters: error.parameters
      });
      throw new Error(`Failed to fetch feed: ${error.message}`);
    }
  }

  /**
   * Gets a single post by ID
   * @param id - Post ID
   * @throws NotFoundException if post doesn't exist
   */
  async getPostById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'likes', 'comments'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  /**
   * Toggles like status for a post
   * @param postId - Post ID
   * @param walletAddress - User's wallet address
   * @throws NotFoundException if post doesn't exist
   */
  async toggleLike(postId: number, walletAddress: string): Promise<{ liked: boolean; likeCount: number }> {
    this.validateWalletAddress(walletAddress);

    const post = await this.getPostById(postId);

    const existingLike = await this.likesRepository.findOne({
      where: { post_id: postId, wallet_address: walletAddress },
    });

    if (existingLike) {
      await this.likesRepository.remove(existingLike);
    } else {
      const like = this.likesRepository.create({
        post_id: postId,
        wallet_address: walletAddress,
      });
      await this.likesRepository.save(like);
    }

    const likeCount = await this.likesRepository.count({
      where: { post_id: postId },
    });

    return {
      liked: !existingLike,
      likeCount,
    };
  }

  /**
   * Adds a comment to a post
   * @param postId - Post ID
   * @param walletAddress - User's wallet address
   * @param content - Comment content
   * @throws NotFoundException if post doesn't exist
   * @throws BadRequestException if content is empty
   */
  async addComment(postId: number, walletAddress: string, content: string): Promise<{ comment: Comment; commentCount: number }> {
    this.validateWalletAddress(walletAddress);

    if (!content?.trim()) {
      throw new BadRequestException('Comment content cannot be empty');
    }

    if (content.length > 280) {
      throw new BadRequestException('Comment must be less than 280 characters');
    }

    const post = await this.getPostById(postId);

    const comment = this.commentsRepository.create({
      post_id: postId,
      wallet_address: walletAddress,
      content,
    });

    await this.commentsRepository.save(comment);

    const commentCount = await this.commentsRepository.count({
      where: { post_id: postId },
    });

    return {
      comment,
      commentCount,
    };
  }

  /**
   * Gets comments for a post
   * @param postId - Post ID
   * @throws NotFoundException if post doesn't exist
   */
  async getComments(postId: number): Promise<Comment[]> {
    const post = await this.getPostById(postId);

    return this.commentsRepository.find({
      where: { post_id: postId },
      relations: ['user'],
      order: { timestamp: 'DESC' },
    });
  }
}