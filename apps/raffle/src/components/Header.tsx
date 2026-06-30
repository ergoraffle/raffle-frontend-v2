'use client';

import { useMemo } from 'react';

/**
 * TODO: Find a better solution to detect mainnet and testnet insted of extract from the `@ergo-raffle/contracts package
 * local:ergo/ergoraffle/raffle-frontend-v2#115
 */
import { raffleInfo } from '@ergo-raffle/contracts';
import { Header as HeaderPrimitive } from '@ergo-raffle/ui-kit';

import { WalletButton } from '@/components';
import { useWalletAddress } from '@/hooks';

export const Header = () => {
  const walletAddress = useWalletAddress();
  const menuLinks = useMemo(
    () => [
      { text: 'All raffles', href: '/raffles' },
      { text: 'FAQ', href: '/faq' },
      { text: 'About', href: '/about' }
    ],
    []
  );

  const activityLink = walletAddress ? `/activity/${walletAddress}` : undefined;

  return (
    <HeaderPrimitive
      testnet={raffleInfo.network === 'Testnet'}
      links={menuLinks}
      activityLink={activityLink}
      connectWalletRender={() => <WalletButton />}
    />
  );
};
