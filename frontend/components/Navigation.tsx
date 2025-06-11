'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { DEFAULT_PROFILE_IMAGE } from '@/utils/constants';
import { useProfile } from '@/contexts/ProfileContext';
import { formatAddress } from '@/utils/format';

export function Navigation() {
  const { address, isConnected } = useAccount();
  const { profile } = useProfile();
  const pathname = usePathname();

  const fullAddress = isConnected && address ? address : '';

  const displayName = profile?.username || formatAddress(fullAddress);

  return (
    <nav className="border-b border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold text-gray-100 hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                DeSo
              </Link>
            </div>
            <div className="ml-6 flex space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                  pathname === '/'
                    ? 'border-blue-500 text-gray-100'
                    : 'border-transparent text-gray-400 hover:border-gray-800 hover:text-gray-100'
                }`}
              >
                Feed
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isConnected ? (
              <Link
                href="/profile"
                className={`inline-flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-900 cursor-pointer transition-all duration-200 ${
                  pathname.startsWith('/profile/') ? 'bg-gray-900' : ''
                }`}
              >
                <img
                  src={profile?.profile_pic_url || DEFAULT_PROFILE_IMAGE}
                  alt={displayName}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span>{profile?.username || 'Profile'}</span>
              </Link>
            ) : (
              <div className="cursor-pointer">
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 