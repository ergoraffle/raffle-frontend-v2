'use client';

import { Badge, BasketStatus } from '@ergo-raffle/ui-kit';

import { useWinnerBasketsParams } from '@/hooks';

export type RaffleWinnerBasketsFiltersProps = {
  isLoading?: boolean;
};

export const RaffleWinnerBasketsFilters = ({ isLoading }: RaffleWinnerBasketsFiltersProps) => {
  const { params, onTypeFilterChange } = useWinnerBasketsParams();
  return (
    <div className="space-x-2">
      <Badge
        variant={params.type === 'share' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('share')}
        aria-disabled={isLoading}
      >
        <BasketStatus filled />
        Share
      </Badge>
      <Badge
        variant={params.type === 'empty' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('empty')}
        aria-disabled={isLoading}
      >
        <BasketStatus />
        Empty
      </Badge>
      <Badge
        variant={params.type === 'gift' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('gift')}
        aria-disabled={isLoading}
      >
        <BasketStatus hasGift />
        Gift
      </Badge>
      <Badge
        variant={params.type === 'share_gift' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('share_gift')}
        aria-disabled={isLoading}
      >
        <BasketStatus filled hasGift />
        Share+ Gift
      </Badge>
    </div>
  );
};
