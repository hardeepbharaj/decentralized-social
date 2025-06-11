'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import { WalletConnect } from '@/components/WalletConnect';
import { PostComposer } from '@/components/feed/PostComposer';
import { Post } from '@/components/feed/Post';
import type { Post as PostType } from '@/types/post.type';
import { getPosts } from '@/services/posts';

export default function Feed() {
  const { address } = useAccount();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await getPosts(address);
      setPosts(data);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [address]);

  const handlePostUpdate = async () => {
    await fetchPosts();
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-400">
        <div className="mt-4">Loading posts...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-100">Feed</h1>
          <WalletConnect />
        </div>

        <div className="space-y-6">
          {address ? (
            <PostComposer onPostCreated={fetchPosts} />
          ) : (
            <div className="rounded-lg border border-gray-800 bg-black p-6 text-center text-gray-400">
              Connect your wallet to start posting!
            </div>
          )}

          {posts.length === 0 ? (
            <div className="rounded-lg border border-gray-800 bg-black p-6 text-center text-gray-400">
              No posts yet. Be the first to post!
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Post key={post.id} {...post} onUpdate={handlePostUpdate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
