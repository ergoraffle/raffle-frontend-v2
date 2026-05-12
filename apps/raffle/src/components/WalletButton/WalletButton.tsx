'use client';

import { useEffect, useMemo } from 'react';

import { WalletError } from '@ergo-raffle/base-wallet';
import { Wallet as WalletIcon } from '@ergo-raffle/icons';
import { Button, Spinner, Tooltip, Typography, toast } from '@ergo-raffle/ui-kit';

import { useWallet } from '@/hooks';

import { Agreement } from './Agreement';
import { ChooseWallet } from './ChooseWallet';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { ErgoWalletAddress } from './ErgoWalletAddress';
import { QRStep } from './QRStep';

export const WalletButton = () => {
  const wallet = useWallet();

  const state = useMemo<'agreement' | 'wallet' | 'ergoAddress'>(() => {
    if (!wallet.agreed) return 'agreement';

    if (wallet.candidate === 'Nautilus') return 'wallet';

    if (wallet.candidate) return 'ergoAddress';

    return 'wallet';
  }, [wallet]);

  useEffect(() => {
    if (wallet.candidate === 'Nautilus' || (wallet.candidate && wallet.ergoAddress)) {
      wallet.connect(wallet.candidate).catch((error) => {
        wallet.setCandidate(undefined);
        toast.error('Failed to connect wallet.', {
          description: error instanceof WalletError ? error.message : undefined,
          errorDetails: error instanceof WalletError ? undefined : error
        });
      });
    }
  }, [wallet.candidate, wallet.ergoAddress, wallet.connect, wallet.setCandidate]);

  useEffect(() => {
    if (!wallet.open) {
      wallet.setCandidate(undefined);
    }
  }, [wallet.open, wallet.setCandidate]);

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
    <>
      <Tooltip
        content={Object.values(wallet.addresses || {}).join(', ')}
        disabled={wallet.connecting || !wallet.selected}
      >
        <Button
          disabled={!!wallet.connecting}
          variant="outline-soft"
          onClick={() => wallet.openDialog()}
        >
          <WalletIcon className="hidden lg:inline-flex" />
          {!!wallet.connecting && (
            <div className="flex items-center">
              <Spinner className="mx-2 size-6" />
              <Typography asChild variant="subtitle-sm" className="text-gray-2">
                <span>connecting...</span>
              </Typography>
            </div>
          )}
          {!wallet.connecting && !!wallet.selected && (
            <div className="max-w-24 overflow-hidden flex items-center">
              <span className="shrink min-w-0 text-nowrap overflow-hidden text-ellipsis">
                {(Object.values(wallet.addresses || {}).join(', ') ?? '').slice(0, -4)}
              </span>
              <span className="shrink-0">
                {(Object.values(wallet.addresses || {}).join(', ') ?? '').slice(-4)}
              </span>
            </div>
          )}
          {!wallet.connecting && !wallet.selected && (
            <>
              <span className="hidden lg:inline-flex">Connect Wallet</span>
              <span className="lg:hidden">Set Wallet</span>
            </>
          )}
        </Button>
      </Tooltip>
      <ConnectWalletDialog
        open={wallet.open}
        onOpenChange={(isOpen) => !isOpen && wallet.closeDialog()}
        title={steps[state].title}
        description={steps[state].description}
      >
        {steps[state].component}
      </ConnectWalletDialog>
    </>
  );
};
