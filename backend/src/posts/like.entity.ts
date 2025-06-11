import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Entity('likes')
export class Like {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn({ length: 42 })
  wallet_address: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'wallet_address' })
  user: User;
}