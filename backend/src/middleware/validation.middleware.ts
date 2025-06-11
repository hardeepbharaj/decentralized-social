import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate wallet address if present in body or query
      const walletAddress = req.body?.wallet_address || req.query?.wallet_address;
      if (walletAddress) {
        if (typeof walletAddress !== 'string') {
          throw new BadRequestException('Wallet address must be a string');
        }
        const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
        if (!ethAddressRegex.test(walletAddress)) {
          throw new BadRequestException('Invalid wallet address format');
        }
      }

      // Validate content if present in body
      const content = req.body?.content;
      if (content !== undefined) {
        if (typeof content !== 'string') {
          throw new BadRequestException('Content must be a string');
        }
        if (!content.trim()) {
          throw new BadRequestException('Content cannot be empty');
        }
        if (content.length > 280) {
          throw new BadRequestException('Content must be less than 280 characters');
        }
      }

      // Validate pagination parameters if present in query
      const page = req.query?.page;
      const limit = req.query?.limit;

      if (page !== undefined) {
        const pageNum = Number(page);
        if (isNaN(pageNum) || pageNum < 1) {
          throw new BadRequestException('Page must be a positive number');
        }
      }

      if (limit !== undefined) {
        const limitNum = Number(limit);
        if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
          throw new BadRequestException('Limit must be between 1 and 100');
        }
      }

      // Validate post ID if present in params
      const postId = req.params?.id;
      if (postId !== undefined) {
        const id = Number(postId);
        if (isNaN(id) || id < 1) {
          throw new BadRequestException('Invalid post ID');
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  }
} 