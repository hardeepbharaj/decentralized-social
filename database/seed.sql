-- Clear existing data
DELETE FROM comments;
DELETE FROM likes;
DELETE FROM posts;
DELETE FROM users;

-- Reset sequences
ALTER SEQUENCE comments_id_seq RESTART WITH 1;
ALTER SEQUENCE posts_id_seq RESTART WITH 1;

-- Insert dummy users
INSERT INTO users (wallet_address, username, bio, profile_pic_url) VALUES
('0x1234567890123456789012345678901234567890', 'sarah_tech', 'Blockchain enthusiast | Web3 Developer', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'),
('0x2345678901234567890123456789012345678901', 'crypto_jake', 'DeFi explorer | Building the future', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'),
('0x3456789012345678901234567890123456789012', 'blockchain_amy', 'Artist & NFT Creator', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'),
('0x4567890123456789012345678901234567890123', 'web3_dev', 'Full-stack Web3 Developer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'),
('0x5678901234567890123456789012345678901234', 'nft_collector', 'Collecting digital art & memories', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80');

-- Insert dummy posts with explicit IDs
INSERT INTO posts (id, wallet_address, content) VALUES
(1, '0x1234567890123456789012345678901234567890', 'Just deployed my first smart contract on Ethereum! The possibilities are endless. 🚀 #Web3 #Ethereum'),
(2, '0x2345678901234567890123456789012345678901', 'DeFi is revolutionizing finance as we know it. Excited to be part of this journey! 💫'),
(3, '0x3456789012345678901234567890123456789012', 'New NFT collection dropping next week! Stay tuned for some amazing digital art 🎨'),
(4, '0x4567890123456789012345678901234567890123', 'The future of social media is decentralized. No more central authorities controlling our data! 🔐'),
(5, '0x5678901234567890123456789012345678901234', 'Just acquired a rare piece for my NFT collection. The digital art space is booming! 🖼️'),
(6, '0x1234567890123456789012345678901234567890', 'Working on a new dApp that will change how we interact with blockchain. More updates coming soon!'),
(7, '0x2345678901234567890123456789012345678901', 'Yield farming strategies in this bear market: A thread 🧵'),
(8, '0x3456789012345678901234567890123456789012', 'Collaboration announcement! Working with @web3_dev on a new NFT project 🤝'),
(9, '0x4567890123456789012345678901234567890123', 'Just published a blog post about Web3 development best practices. Check it out!'),
(10, '0x5678901234567890123456789012345678901234', 'The metaverse is not just a buzzword, it''s the future of digital interaction 🌐');

-- Update the sequence after explicit inserts
SELECT setval('posts_id_seq', 10);

-- Insert some likes
INSERT INTO likes (post_id, wallet_address) VALUES
(1, '0x2345678901234567890123456789012345678901'),
(1, '0x3456789012345678901234567890123456789012'),
(2, '0x1234567890123456789012345678901234567890'),
(2, '0x4567890123456789012345678901234567890123'),
(3, '0x5678901234567890123456789012345678901234'),
(3, '0x1234567890123456789012345678901234567890'),
(4, '0x2345678901234567890123456789012345678901'),
(5, '0x3456789012345678901234567890123456789012');

-- Insert some comments
INSERT INTO comments (post_id, wallet_address, content) VALUES
(1, '0x2345678901234567890123456789012345678901', 'Congratulations! What chain are you deploying on next? 🤔'),
(1, '0x3456789012345678901234567890123456789012', 'This is amazing! Would love to collaborate sometime'),
(2, '0x4567890123456789012345678901234567890123', 'Totally agree! The traditional finance system needs this disruption'),
(3, '0x5678901234567890123456789012345678901234', 'Can''t wait to see the collection! 🎨'),
(4, '0x1234567890123456789012345678901234567890', 'Privacy and data ownership are crucial in the Web3 era'),
(5, '0x2345678901234567890123456789012345678901', 'Which collection did you get? The market is so exciting right now!'); 