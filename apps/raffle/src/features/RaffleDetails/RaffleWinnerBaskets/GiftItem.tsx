'use client';

import type { BasketGiftDetail } from '@ergo-raffle/client';
import { Verified } from '@ergo-raffle/icons';
import { Typography } from '@ergo-raffle/ui-kit';

export type GiftItemProps = {
  gift: BasketGiftDetail;
};

export const GiftItem = ({ gift }: GiftItemProps) => (
  <div>
    {gift.assets.map((asset) => (
      <div className="flex items-center gap-2" key={asset.tokenId}>
        <Typography variant="body-lg">
          {asset.amount}X {asset.tokenName}
        </Typography>
        {!!gift.verified && <Verified className="text-primary-1 size-6" />}
      </div>
    ))}
  </div>
);
