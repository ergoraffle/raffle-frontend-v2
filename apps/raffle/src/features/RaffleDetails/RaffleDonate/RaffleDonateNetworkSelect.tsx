'use client';

import { Bitcoin, BitcoinRunes, Ergo, Right } from '@ergo-raffle/icons';
import { Spinner, Typography } from '@ergo-raffle/ui-kit';

import { useDonate } from '@/hooks';
import type { Network } from '@/providers';

export const RaffleDonateNetworkSelect = () => {
  const { selectNetwork, bridgeableData, isLoading } = useDonate();

  const networkOptions = [
    {
      label: 'Ergo',
      value: 'ergo',
      icon: <Ergo className="size-6" />
    },
    {
      label: 'Bitcoin And Runes',
      value: 'bitcoin',
      icon: (
        <>
          <Bitcoin className="size-6" />
          <BitcoinRunes className="size-6 -ml-2" />
        </>
      )
    }
  ];

  return networkOptions.map((option) => (
    <button
      key={option.value}
      className="flex items-center justify-between bg-gray-5 rounded-md p-2.5 disabled:opacity-50 cursor-pointer border border-transparent hover:border-gray-4"
      disabled={isLoading || !bridgeableData?.bridgeable}
      type="button"
      onClick={() => selectNetwork(option.value as Network)}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-12">{option.icon}</div>
        {option.label}{' '}
        {!!isLoading && (
          <>
            <Spinner className="ml-2 mr-1 size-4" />
            <Typography asChild variant="subtitle-sm" className="text-gray-2">
              <span>loading...</span>
            </Typography>
          </>
        )}
      </div>
      <Right className="size-6" />
    </button>
  ));
};
