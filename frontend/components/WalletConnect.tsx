'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { DEFAULT_PROFILE_IMAGE } from '@/utils/constants';
import { useProfile } from '@/contexts/ProfileContext';
import { formatAddress } from '@/utils/format';

export function WalletConnect() {
  const { profile } = useProfile();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        const displayName = profile?.username || account?.displayName || '';
        const displayBalance = account?.displayBalance;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={() => openConnectModal()}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 cursor-pointer transition-colors duration-200"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 cursor-pointer transition-colors duration-200"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex gap-3">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-900 cursor-pointer hover:bg-red-200 transition-colors duration-200"
                  >
                    {chain.hasIcon && (
                      <div className="mr-2 h-6 w-6">
                        {chain.iconUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="h-6 w-6"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <img
                      src={profile?.profile_pic_url || DEFAULT_PROFILE_IMAGE}
                      alt={profile?.username || account.displayName}
                      className="mr-2 h-6 w-6 rounded-full object-cover"
                    />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{displayName || formatAddress(account.address)}</span>
                      {displayBalance && (
                        <span className="text-xs text-gray-500">{displayBalance}</span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
} 