'use client';

import type { WinnerBasketSummary } from '@ergo-raffle/client';
import { Left, Right } from '@ergo-raffle/icons';
import { BasketStatus, Button, Skeleton } from '@ergo-raffle/ui-kit';

export type WinnerBasketSliderProps = {
  setActiveBasketIndex?: (basketId: number) => void;
  totalBaskets?: number;
  isLoading?: boolean;
  basket?: WinnerBasketSummary;
};

export const WinnerBasketSlider = ({
  setActiveBasketIndex,
  totalBaskets,
  isLoading = true,
  basket
}: WinnerBasketSliderProps) => {
  const onSlideNext = () => {
    if (setActiveBasketIndex && basket && basket.index) {
      setActiveBasketIndex(basket.index + 1);
    }
  };
  const onSlidePrev = () => {
    if (setActiveBasketIndex && basket && basket.index) {
      setActiveBasketIndex(basket.index - 1);
    }
  };

  return (
    <div className="flex items-center mx-auto md:w-1/2 justify-between">
      <Button
        size="icon-xs"
        variant="plain"
        onClick={onSlidePrev}
        type="button"
        disabled={!basket || basket.index === 1 || isLoading}
      >
        <Left className="size-7" />
      </Button>
      <div className="flex items-center gap-1 justify-center w-full">
        {isLoading ? (
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
        onClick={onSlideNext}
        type="button"
        disabled={!(totalBaskets && basket) || basket.index === totalBaskets || isLoading}
      >
        <Right className="size-7" />
      </Button>
    </div>
  );
};
