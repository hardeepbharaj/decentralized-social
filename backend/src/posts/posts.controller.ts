import { Controller, Get, Post as PostDecorator, Body, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getFeed(
    @Query('page') pageStr?: string,
    @Query('limit') limitStr?: string,
    @Query('wallet_address') walletAddress?: string,
  ): Promise<Post[]> {
    // Convert and validate pagination parameters
    const page = pageStr ? Math.max(1, parseInt(pageStr)) : 1;
    const limit = limitStr ? Math.min(100, Math.max(1, parseInt(limitStr))) : 20;

    // Handle NaN cases
    if (isNaN(page) || isNaN(limit)) {
      return this.postsService.getFeed(1, 20, walletAddress);
    }

    return this.postsService.getFeed(page, limit, walletAddress);
  }

  @PostDecorator()
  async createPost(@Body() body: { content: string; wallet_address: string }): Promise<Post> {
    return this.postsService.createPost(body.wallet_address, body.content);
  }

  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<Post> {
    return this.postsService.getPostById(id);
  }

  @PostDecorator(':id/like')
  async likePost(
    @Param('id') id: number,
    @Body() body: { wallet_address: string }
  ) {
    return this.postsService.toggleLike(id, body.wallet_address);
  }

  @PostDecorator(':id/comment')
  async commentOnPost(
    @Param('id') id: number,
    @Body() body: { wallet_address: string; content: string }
  ) {
    return this.postsService.addComment(id, body.wallet_address, body.content);
  }

  @Get(':id/comments')
  async getPostComments(@Param('id') id: number) {
    return this.postsService.getComments(id);
  }
}