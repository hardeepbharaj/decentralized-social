# Decentralized Social Frontend

A decentralized social media platform that enables users to connect their Ethereum wallets, post messages, and interact with other users in a decentralized manner.

## Features

- **Wallet Integration**: Connect with your Ethereum wallet using RainbowKit
- **Post Creation**: Share your thoughts with a 280-character limit
- **Interactions**: Like posts and view comments
- **Profile Management**: Create and update your profile with username, bio, and profile picture
- **Responsive Design**: Mobile-first layout using Tailwind CSS

## Technologies Used

- **Next.js**: React framework for production
- **RainbowKit**: Ethereum wallet connection
- **Wagmi**: React Hooks for Ethereum
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Hot Toast**: Toast notifications

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- An Ethereum wallet (e.g., MetaMask)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.



## Development Guidelines

- Follow the TypeScript type system strictly
- Use React hooks for state management
- Keep components modular and reusable
- Follow the Tailwind CSS class naming conventions
- Handle errors gracefully with user feedback
- Maintain responsive design across all screen sizes

## API Integration

The frontend communicates with the backend through a REST API. The base URL is configured via the `NEXT_PUBLIC_API_URL` environment variable. All API calls are centralized in the services folder.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.

# Frontend Implementation Guide

## Future Performance Improvements

### Feed Optimization
- Implement infinite scroll using Intersection Observer for better UX
- Add cursor-based pagination to reduce server load
- Introduce virtualization for handling large post lists
- Implement progressive image loading for media content

### Data Layer Enhancements
- Integrate SWR/RTK Query for smart API caching
  - Automatic background revalidation
  - Optimistic updates for likes/comments
  - Built-in error handling with retries
  - Efficient pagination cache

- Implement Redux Toolkit for robust state management
  - Centralized store architecture
  - Normalized data structure
  - Memoized selectors
  - Optimized re-renders

### API Evolution
- Migrate to GraphQL for:
  - Reduced network payload
  - Single request for multiple data needs
  - Real-time updates via subscriptions
  - Type-safe API layer
  - Efficient caching

### Performance Optimizations
- Add skeleton loaders for perceived performance
- Implement service workers for offline support
- Enable server-side rendering for initial load
- Introduce analytics for performance monitoring