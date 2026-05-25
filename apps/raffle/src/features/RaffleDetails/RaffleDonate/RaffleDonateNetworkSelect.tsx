'use client';

import { Bitcoin, BitcoinRunes, Ergo, Right } from '@ergo-raffle/icons';
import { Spinner, Typography } from '@ergo-raffle/ui-kit';

import { useDonate } from '@/hooks';

export const RaffleDonateNetworkSelect = () => {
  const { selectNetwork, bridgeableData, isLoading } = useDonate();

  return (
    <>
      <button
        className="flex items-center justify-between bg-gray-5 rounded-md p-2.5 disabled:opacity-50"
        disabled={isLoading || !bridgeableData}
        type="button"
        onClick={() => selectNetwork('ergo')}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-12">
            <Ergo className="size-6" />
          </div>
          Ergo{' '}
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
      <button
        className="flex items-center justify-between bg-gray-5 rounded-md p-2.5 disabled:opacity-50"
        disabled={isLoading || !bridgeableData || !bridgeableData.bridgeable}
        type="button"
        onClick={() => selectNetwork('bitcoin')}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-12">
            <Bitcoin className="size-6" />
            <BitcoinRunes className="size-6 -ml-2" />
          </div>
          Bitcoin And Runes{' '}
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
    </>
  );
};
