'use client';

import { useMemo } from 'react';

import { useWallet } from '@/hooks';

import { Agreement } from './Agreement';
import { ChooseWallet } from './ChooseWallet';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { ErgoWalletAddress } from './ErgoWalletAddress';
import { QRStep } from './QRStep';

export const WalletDialog = () => {
  const wallet = useWallet();

  const state = useMemo<'agreement' | 'wallet' | 'ergoAddress'>(() => {
    if (!wallet.agreed) return 'agreement';

    if (wallet.candidate === 'Nautilus') return 'wallet';

    if (wallet.candidate) return 'ergoAddress';

    return 'wallet';
  }, [wallet]);

  const steps: Record<
    'agreement' | 'wallet' | 'ergoAddress' | 'qr',
    { component: React.ReactNode; title: string; description?: string }
  > = {
    agreement: {
      component: <Agreement />,
      title: 'Agreement'
    },
    qr: {
      component: <QRStep />,
      title: 'Connect via Ergopay'
    },
    wallet: {
      component: <ChooseWallet />,
      title: 'Connect Wallet',
      description: 'Choose how you want to connect.'
    },
    ergoAddress: {
      component: <ErgoWalletAddress />,
      title: 'Connect via Ergopay'
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
