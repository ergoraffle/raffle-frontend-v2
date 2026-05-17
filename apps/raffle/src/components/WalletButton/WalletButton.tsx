'use client';

import { Wallet as WalletIcon } from '@ergo-raffle/icons';
import { Button, Spinner, Tooltip, Typography } from '@ergo-raffle/ui-kit';

import { useWallet } from '@/hooks';

export const WalletButton = () => {
  const wallet = useWallet();

  return (
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
  );
};
