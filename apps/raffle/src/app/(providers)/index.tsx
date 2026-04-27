'use client';

import type { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import type { InfoBlockchainResponse } from '@ergo-raffle/client';
import {
  type AnchorComponent,
  FrameworkProvider,
  type ImageComponent as ImageComponentType,
  ThemeProvider,
  Toaster
} from '@ergo-raffle/ui-kit';

import { WalletProvider } from '@/hooks';

import { InfoBlockchainProvider } from './InfoBlockchainProvider';

const Anchor: AnchorComponent = (props) => <Link {...props} />;
const ImageComponent: ImageComponentType = (props) => <Image {...props} />;

type AppProvidersProps = {
  children: ReactNode;
  infoBlockchain: InfoBlockchainResponse;
};

export const AppProviders = ({ children, infoBlockchain }: AppProvidersProps) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <Toaster />
    <FrameworkProvider components={{ Anchor, Image: ImageComponent }}>
      <InfoBlockchainProvider infoBlockchain={infoBlockchain}>
        <WalletProvider>{children}</WalletProvider>
      </InfoBlockchainProvider>
    </FrameworkProvider>
  </ThemeProvider>
);
