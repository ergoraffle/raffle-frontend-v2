'use client';

import type { BasketGift } from '@ergo-raffle/client';
import { Token, Typography } from '@ergo-raffle/ui-kit';

export type GiftItemProps = {
  gift: BasketGift;
};

export const GiftItem = ({ gift }: GiftItemProps) => (
  <div className="py-1.5 px-2 rounded-sm bg-white-1 space-y-1">
    {gift.assets.map((asset) => (
      <div
        className="flex justify-between items-center not-last:border-b border-b-gray-5 py-2"
        key={asset.tokenId}
      >
        <Token tokenId={asset.tokenId} name={asset.tokenName} />
        <Typography variant="subtitle-md" className="text-gray-2 text-right grow">
          {asset.amount}
        </Typography>
      </div>
    ))}
  </div>
);
