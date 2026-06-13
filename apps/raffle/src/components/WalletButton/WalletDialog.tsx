'use client';

import { useMemo } from 'react';

import { useWallet } from '@/hooks';

import { Agreement } from './Agreement';
import { ChooseWallet } from './ChooseWallet';
import { ConnectWalletDialog } from './ConnectWalletDialog';

export const WalletDialog = () => {
  const wallet = useWallet();

  const state = useMemo<'agreement' | 'wallet'>(() => {
    if (!wallet.agreed) return 'agreement';
    return 'wallet';
  }, [wallet]);

  const steps: Record<
    'agreement' | 'wallet',
    { component: React.ReactNode; title: string; description?: string }
  > = {
    agreement: {
      component: <Agreement />,
      title: 'Agreement'
    },
    wallet: {
      component: <ChooseWallet />,
      title: 'Connect Wallet',
      description: 'Choose how you want to connect.'
    }
  };

  return (
    <ConnectWalletDialog
      open={wallet.open}
      onOpenChange={(isOpen) => !isOpen && wallet.closeDialog()}
      title={steps[state].title}
      description={steps[state].description}
    >
      {steps[state].component}
    </ConnectWalletDialog>
  );
};
