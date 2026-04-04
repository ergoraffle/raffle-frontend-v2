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
  setActiveBasketId?: (basketId: string) => void;
};

export const WinnerBasketCarousel = ({
  raffleId,
  setActiveBasketId
}: WinnerBasketCarouselProps) => {
  const { items, isLoading } = useFetchWinnerBaskets(raffleId);
  const onSlideChange = (index: number) => {
    if (items && setActiveBasketId) {
      const foundedBasket = items[index];
      setActiveBasketId(foundedBasket.basketId);
    }
  };
  return isLoading ? (
    <Skeleton className="h-3 w-1/2 mx-auto" />
  ) : (
    <Carousel onChangeSlide={onSlideChange}>
      <CarouselContent>
        {items?.map((item) => (
          <CarouselItem key={item.basketId}>
            <div className="flex items-center gap-1 px-10 justify-center">
              <BasketStatus
                className="size-5"
                filled={Boolean(item.shareAmount)}
                hasGift={Boolean(item.gifts)}
              />
              # {item.basketId}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
};
