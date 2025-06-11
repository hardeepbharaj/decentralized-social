import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 42 })
  wallet_address: string;

  @Column({ length: 280 })
  content: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'wallet_address' })
  user: User;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  like_count?: number;
  comment_count?: number;
  is_liked?: boolean;
}