'use client';

import { useState, useEffect, useMemo } from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';

import { ProfileProvider } from '@/contexts/ProfileContext';
import CustomAvatar from '@/components/CustomAvatar';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [wagmiConfig, setWagmiConfig] = useState<any>(null);

  useEffect(() => {
    const config = getDefaultConfig({
      appName: 'Decentralized Social',
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '',
      chains: [mainnet, sepolia],
      ssr: false,
    });

    setWagmiConfig(config);
  }, []);

  if (!wagmiConfig) return null;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          avatar={CustomAvatar}
          showRecentTransactions={true}
          modalSize="compact"
        >
          <ProfileProvider>
            {children}
            <Toaster />
          </ProfileProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers; 