-- Create database
CREATE DATABASE decentralized_social;

-- Users table
CREATE TABLE users (
    wallet_address VARCHAR(42) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    bio TEXT,
    profile_pic_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) REFERENCES users(wallet_address),
    content VARCHAR(280) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Likes table
CREATE TABLE likes (
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    wallet_address VARCHAR(42) REFERENCES users(wallet_address),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, wallet_address)
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    wallet_address VARCHAR(42) REFERENCES users(wallet_address),
    content VARCHAR(280) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_posts_timestamp ON posts(timestamp DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);