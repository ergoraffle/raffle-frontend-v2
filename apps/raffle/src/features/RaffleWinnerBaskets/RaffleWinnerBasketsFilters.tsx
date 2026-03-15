'use client';

import { Badge, BasketStatus } from '@ergo-raffle/ui-kit';

import { useWinnerBasketsParams } from '@/hooks/useWinnerBasketsParams';

export const RaffleWinnerBasketsFilters = () => {
  const { params, onTypeFilterChange } = useWinnerBasketsParams();
  return (
    <div className="space-x-2">
      <Badge
        variant={params.type === 'share' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('share')}
      >
        <BasketStatus filled />
        Share
      </Badge>
      <Badge
        variant={params.type === 'empty' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('empty')}
      >
        <BasketStatus />
        Empty
      </Badge>
      <Badge
        variant={params.type === 'gift' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('gift')}
      >
        <BasketStatus hasGift />
        Gift
      </Badge>
      <Badge
        variant={params.type === 'share_gift' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('share_gift')}
      >
        <BasketStatus filled hasGift />
        Share+ Gift
      </Badge>
    </div>
  );
};
