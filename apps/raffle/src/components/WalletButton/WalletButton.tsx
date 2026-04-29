'use client';

import { useEffect, useMemo, useState } from 'react';

import { Wallet as WalletIcon } from '@ergo-raffle/icons';
import { Button, Spinner, Tooltip, Typography, toast } from '@ergo-raffle/ui-kit';

import { useWallet } from '@/hooks';
import { getErrorMessage } from '@/lib';

import { Agreement } from './Agreement';
import { ChooseWallet } from './ChooseWallet';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { ErgoWalletAddress } from './ErgoWalletAddress';
import { QRStep } from './QRStep';

export const WalletButton = () => {
  const wallet = useWallet();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!wallet.error) return;

    toast.error(getErrorMessage(wallet.error));

    setOpen(false);
  }, [wallet.error]);

  const state = useMemo<'agreement' | 'wallet' | 'ergoAddress'>(() => {
    if (!wallet.agreed) return 'agreement';

    if (wallet.candidate === 'Nautilus') return 'wallet';

    if (wallet.candidate) return 'ergoAddress';

    return 'wallet';
  }, [wallet]);

  useEffect(() => {
    if (wallet.selected) {
      setOpen(false);
    }
  }, [wallet.selected]);

  useEffect(() => {
    if (wallet.candidate === 'Nautilus') {
      wallet.connect(wallet.candidate);
    }
  }, [wallet.candidate, wallet.connect]);

  useEffect(() => {
    if (!open) {
      wallet.setCandidate(undefined);
      wallet.setErgoAddress(undefined);
    }
  }, [open, wallet.setCandidate, wallet.setErgoAddress]);

  useEffect(() => {
    if (wallet.candidate && wallet.ergoAddress) {
      wallet.connect(wallet.candidate);
    }
  }, [wallet.candidate, wallet.ergoAddress, wallet.connect]);

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
        <Button disabled={!!wallet.connecting} variant="outline-soft" onClick={() => setOpen(true)}>
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
        open={open}
        onOpenChange={setOpen}
        title={steps[state].title}
        description={steps[state].description}
      >
        {steps[state].component}
      </ConnectWalletDialog>
    </>
  );
};
