import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ValidationMiddleware } from './middleware/validation.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'decentralized_social',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes(
        { path: 'posts', method: RequestMethod.POST }, // Create post
        { path: 'posts', method: RequestMethod.GET }, // Get feed (with pagination)
        { path: 'posts/:id', method: RequestMethod.GET }, // Get single post
        { path: 'posts/:id/like', method: RequestMethod.POST }, // Like post
        { path: 'posts/:id/comment', method: RequestMethod.POST }, // Add comment
        { path: 'posts/:id/comments', method: RequestMethod.GET }, // Get comments
      );
  }
}