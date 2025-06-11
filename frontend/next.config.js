/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // false only for development
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:3001',
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: '5d67cc1f046f74a6e60f00708feae653'
  }
};

module.exports = nextConfig;