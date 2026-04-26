'use client';

import { Badge, BasketStatus } from '@ergo-raffle/ui-kit';
import type { GetRaffleRaffleIdBasketParams } from '@ergo-raffle/client';

export type RaffleWinnerBasketsFiltersProps = {
  isLoading?: boolean;
  params: GetRaffleRaffleIdBasketParams;
  onTypeFilterChange: (withShare: boolean, withGift: boolean) => void;
};

export const RaffleWinnerBasketsFilters = ({
  isLoading,
  params,
  onTypeFilterChange
}: RaffleWinnerBasketsFiltersProps) => (
  <div className="space-x-2 space-y-2">
    <Badge
      variant={params.withShare && !params.withGift ? 'secondary' : 'elevated'}
      size="lg"
      className="cursor-pointer"
      onClick={() => onTypeFilterChange(true, false)}
      aria-disabled={isLoading}
    >
      <BasketStatus filled />
      Share
    </Badge>
    <Badge
      variant={params.withShare === false && params.withGift === false ? 'secondary' : 'elevated'}
      size="lg"
      className="cursor-pointer"
      onClick={() => onTypeFilterChange(false, false)}
      aria-disabled={isLoading}
    >
      <BasketStatus />
      Empty
    </Badge>
    <Badge
      variant={params.withGift && !params.withShare ? 'secondary' : 'elevated'}
      size="lg"
      className="cursor-pointer"
      onClick={() => onTypeFilterChange(false, true)}
      aria-disabled={isLoading}
    >
      <BasketStatus hasGift />
      Gift
    </Badge>
    <Badge
      variant={params.withGift && params.withShare ? 'secondary' : 'elevated'}
      size="lg"
      className="cursor-pointer"
      onClick={() => onTypeFilterChange(true, true)}
      aria-disabled={isLoading}
    >
      <BasketStatus filled hasGift />
      Share+ Gift
    </Badge>
  </div>
);
