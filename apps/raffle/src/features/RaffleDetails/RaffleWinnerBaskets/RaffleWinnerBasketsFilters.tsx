'use client';

import { Badge, BasketStatus } from '@ergo-raffle/ui-kit';

import type { WinnerBasketsTypeFilter } from '@/hooks';

export type RaffleWinnerBasketsFiltersProps = {
  isLoading?: boolean;
  type?: WinnerBasketsTypeFilter;
  onTypeFilterChange: (type: WinnerBasketsTypeFilter) => void;
};

export const RaffleWinnerBasketsFilters = ({
  isLoading,
  type,
  onTypeFilterChange
}: RaffleWinnerBasketsFiltersProps) => (
  <div className="space-x-2 space-y-2">
    <Badge
      variant={type === 'share' ? 'secondary' : 'elevated'}
      size="lg"
      className="cursor-pointer"
      onClick={() => onTypeFilterChange('share')}
      aria-disabled={isLoading}
    >
      <BasketStatus filled />
      Share
    </Badge>
    <Badge
      variant={type === 'empty' ? 'secondary' : 'elevated'}
      size="lg"
      className="cursor-pointer"
      onClick={() => onTypeFilterChange('empty')}
      aria-disabled={isLoading}
    >
      <BasketStatus />
      Empty
    </Badge>
    <Badge
      variant={type === 'gift' ? 'secondary' : 'elevated'}
      size="lg"
      className="cursor-pointer"
      onClick={() => onTypeFilterChange('gift')}
      aria-disabled={isLoading}
    >
      <BasketStatus hasGift />
      Gift
    </Badge>
    <Badge
      variant={type === 'share-gift' ? 'secondary' : 'elevated'}
      size="lg"
      className="cursor-pointer"
      onClick={() => onTypeFilterChange('share-gift')}
      aria-disabled={isLoading}
    >
      <BasketStatus filled hasGift />
      Share+ Gift
    </Badge>
  </div>
);
