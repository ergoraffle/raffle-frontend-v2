'use client';

import { type ReactNode, useMemo } from 'react';

import { Left } from '@ergo-raffle/icons';
import { Button } from '@ergo-raffle/ui-kit';

import { useWallet } from '@/hooks';

import { Agreement } from './Agreement';
import { ChooseWallet } from './ChooseWallet';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { FallbackAddress } from './FallbackAddress';

export const WalletDialog = () => {
  const wallet = useWallet();

  const state = useMemo<'agreement' | 'wallet' | 'ergoAddress'>(() => {
    if (!wallet.agreed) return 'agreement';

    if (wallet.candidate === 'Nautilus') return 'wallet';

    if (wallet.candidate) return 'ergoAddress';

    return 'wallet';
  }, [wallet]);

  const steps: Record<
    'agreement' | 'wallet' | 'ergoAddress',
    {
      component: React.ReactNode;
      title: string | ReactNode;
      description?: string;
      dialogMinWidth?: string;
    }
  > = {
    agreement: {
      component: <Agreement />,
      title: 'Agreement'
    },
    wallet: {
      component: <ChooseWallet />,
      title: 'Connect Wallet',
      description: 'Choose how you want to connect.'
    },
    ergoAddress: {
      component: <FallbackAddress />,
      title: (
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="plain"
            size="icon-xs"
            onClick={() => wallet.setCandidate(undefined)}
          >
            <Left />
          </Button>
          Fallback Address
        </div>
      ),
      dialogMinWidth: 'min-w-4xl'
    }
  };

  return (
    <ConnectWalletDialog
      open={wallet.open}
      onOpenChange={(isOpen) => !isOpen && wallet.closeDialog()}
      title={steps[state].title}
      description={steps[state].description}
      dialogMinWidth={steps[state].dialogMinWidth}
    >
      {steps[state].component}
    </ConnectWalletDialog>
  );
};
