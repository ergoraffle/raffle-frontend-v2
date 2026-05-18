'use client';

import { Gift, Ticket } from '@ergo-raffle/icons';
import { Badge } from '@ergo-raffle/ui-kit';

import { useActivitiesQuery } from '@/hooks/useActivitiesParamsServer';

export type ActivityFilersProps = {
  loading?: boolean;
};

export const ActivityFilers = ({ loading }: ActivityFilersProps) => {
  const { onTypeFilterChange, params } = useActivitiesQuery();

  return (
    <div className="space-x-2 mt-2">
      <Badge
        variant={params.types?.includes('donation') ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('donation')}
        aria-disabled={loading}
      >
        <Ticket />
        Tickets
      </Badge>
      <Badge
        variant={params.types?.includes('gift') ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('gift')}
        aria-disabled={loading}
      >
        <Gift />
        Gifts
      </Badge>
    </div>
  );
};
