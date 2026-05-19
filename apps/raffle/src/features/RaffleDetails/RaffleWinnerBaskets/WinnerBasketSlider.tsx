'use client';

import type { GetRaffleRaffleIdBasket200ItemsItem } from '@ergo-raffle/client';
import { Left, Right } from '@ergo-raffle/icons';
import { BasketStatus, Button, Skeleton } from '@ergo-raffle/ui-kit';

export type WinnerBasketSliderProps = {
  onNextSlide: () => void;
  onPrevSlide: () => void;
  hasNext: boolean;
  loading?: boolean;
  basket?: GetRaffleRaffleIdBasket200ItemsItem;
};

export const WinnerBasketSlider = ({
  onNextSlide,
  onPrevSlide,
  hasNext,
  loading = true,
  basket
}: WinnerBasketSliderProps) => (
  <div className="flex items-center mx-auto md:w-1/2 justify-between">
    <Button
      size="icon-xs"
      variant="plain"
      onClick={onPrevSlide}
      type="button"
      disabled={!basket || basket.index === 1 || loading}
    >
      <Left className="size-7" />
    </Button>
    <div className="flex items-center gap-1 justify-center w-full">
      {loading ? (
        <Skeleton className="h-3 w-1/2 mx-auto" />
      ) : basket ? (
        <>
          <BasketStatus
            className="size-5"
            filled={Boolean(basket.share)}
            hasGift={Boolean(basket.gifts)}
          />
          # {basket.index}
        </>
      ) : (
        'not found'
      )}
    </div>
    <Button
      size="icon-xs"
      variant="plain"
      onClick={onNextSlide}
      type="button"
      disabled={!hasNext || loading}
    >
      <Right className="size-7" />
    </Button>
  </div>
);
