'use client';

import type { BasketGift, TokenSummary } from '@ergo-raffle/client';
import { Verified } from '@ergo-raffle/icons';
import { getDecimalString, Typography } from '@ergo-raffle/ui-kit';

export type GiftItemProps = {
  gift: BasketGift;
  giftToken?: TokenSummary;
};

export const GiftItem = ({ gift, giftToken }: GiftItemProps) => (
  <div>
    <div className="flex items-center gap-2" key={gift.tokenId}>
      <Typography variant="body-lg">
        {getDecimalString(gift.amount, giftToken?.decimals)}X {giftToken?.name}
      </Typography>
      {!!giftToken?.verified && <Verified className="text-primary-1 size-6" />}
    </div>
  </div>
);
