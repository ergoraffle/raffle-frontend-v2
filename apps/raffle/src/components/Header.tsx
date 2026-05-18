'use client';

import { useMemo } from 'react';

import { Header as HeaderPrimitive } from '@ergo-raffle/ui-kit';

import { WalletButton } from '@/components';
import { useWalletAddress } from '@/hooks';

export const Header = () => {
  const walletAddress = useWalletAddress();
  const menuLinks = useMemo(
    () => [
      { text: 'All raffles', href: '/raffles' },
      { text: 'FAQ', href: '/faq' },
      { text: 'About/Contact', href: '/' }
    ],
    []
  );

  const activityLink = walletAddress ? `/activity/${walletAddress}` : undefined;

  return (
    <HeaderPrimitive
      links={menuLinks}
      activityLink={activityLink}
      connectWalletRender={() => <WalletButton />}
    />
  );
};
