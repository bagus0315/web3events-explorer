'use client'

import { PolkitProvider, alephzero } from 'polconnect'
import {ParallaxProvider} from 'react-scroll-parallax'

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  rainbowWallet,
  injectedWallet,
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: '872727b9b45a200b7d4434b50df6c23b',
  wallets: [
    {
      groupName: 'Other',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        rainbowWallet,
        injectedWallet,
        argentWallet,
        trustWallet,
        ledgerWallet,
      ],
    },
  ],
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  ],
  ssr: true,
});

const queryClient = new QueryClient();


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PolkitProvider defaultChain={alephzero} appName='Test App' theme='dark'>
          <ParallaxProvider>
          <RainbowKitProvider>{children}</RainbowKitProvider>
          </ParallaxProvider>
        </PolkitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
