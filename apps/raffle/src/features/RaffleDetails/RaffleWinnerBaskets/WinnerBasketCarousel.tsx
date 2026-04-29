import { useMemo } from 'react';

import {
  BasketStatus,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Skeleton
} from '@ergo-raffle/ui-kit';

import { useFetchWinnerBaskets } from '@/hooks/useFetchWinnerBaskets';

export type WinnerBasketCarouselProps = {
  raffleId: string;
  setActiveBasketId?: (basketId: number) => void;
};

export const WinnerBasketCarousel = ({
  raffleId,
  setActiveBasketId
}: WinnerBasketCarouselProps) => {
  const params = useMemo(() => ({}), []);
  const { data, isLoading } = useFetchWinnerBaskets(raffleId, params);
  const onSlideChange = (index: number) => {
    if (data?.items && setActiveBasketId) {
      const foundedBasket = data?.items[index];
      setActiveBasketId(foundedBasket.index);
    }
  };
  return isLoading ? (
    <Skeleton className="h-3 w-1/2 mx-auto" />
  ) : (
    <Carousel onChangeSlide={onSlideChange}>
      <CarouselContent>
        {data?.items?.map((item) => (
          <CarouselItem key={item.index}>
            <div className="flex items-center gap-1 justify-center">
              <BasketStatus
                className="size-5"
                filled={Boolean(item.share)}
                hasGift={Boolean(item.gifts)}
              />
              # {item.index}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
};
