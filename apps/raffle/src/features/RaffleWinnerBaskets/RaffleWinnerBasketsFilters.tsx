'use client';

import { Badge, BasketStatus, Button } from '@ergo-raffle/ui-kit';

import { useWinnerBasketsParams } from '@/hooks/useWinnerBasketsParams';

export const RaffleWinnerBasketsFilters = () => {
  const { params, onTypeFilterChange } = useWinnerBasketsParams();
  return (
    <div className="space-x-2">
      <Badge
        variant={params.type === 'share' ? 'primary' : 'elevated'}
        size="sm"
        onClick={() => onTypeFilterChange('share')}
      >
        <BasketStatus filled />
        Share
      </Badge>
      <Badge variant="elevated" size="sm" asChild>
        <Button>
          <BasketStatus />
          Empty
        </Button>
      </Badge>
      <Badge variant="elevated" size="sm" asChild>
        <Button>
          <BasketStatus hasGift />
          Gift
        </Button>
      </Badge>
      <Badge variant="elevated" size="sm" asChild>
        <Button>
          <BasketStatus filled hasGift />
          Share+ Gift
        </Button>
      </Badge>
    </div>
  );
};
