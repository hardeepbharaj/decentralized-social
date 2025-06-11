<h2 align="center">Demo</h2>

<p align="center">
  <img src="Demo.gif" alt="Demo">
</p>

# Decentralized Social Platform

A prototype social media platform built with blockchain technology, allowing users to connect their wallets, create posts, like, and comment.

## Features

- Wallet Connection (MetaMask integration)
- Post Creation and Feed
- Like System
- Comment System
- User Profiles
- Real-time Updates

## Tech Stack

### Frontend
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- wagmi (Ethereum hooks)
- React Hot Toast (Notifications)

### Backend
- Node.js
- Nest.js
- TypeORM
- PostgreSQL
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- MetaMask wallet

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

4. Set up environment variables:

Backend (.env):
```
DATABASE_URL=postgresql://[user]:[password]@localhost:5432/decentralized_social
PORT=3001
```

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

5. Set up and seed the database:
```bash
# Create database and tables
createdb decentralized_social
psql decentralized_social < database/schema.sql

# Insert sample data (optional but recommended for development)
psql decentralized_social < database/seed.sql
```

6. Run the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

### Database
- `/database/schema.sql` - Database schema
- `/database/seed.sql` - Sample data for development

- The application will now be running with sample data including users, posts, likes, and comments.

## Error Handling
- Frontend uses toast notifications for user feedback
- Backend implements proper error responses
- Type safety with TypeScript

## Future Improvements
- [ ] Add unit tests
- [ ] Implement caching
- [ ] Add rate limiting
- [ ] Enhance security measures
- [ ] Add pagination for posts and comments
