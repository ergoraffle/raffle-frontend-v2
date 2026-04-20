'use client';

import { Gift, Ticket, Votes } from '@ergo-raffle/icons';
import { Badge } from '@ergo-raffle/ui-kit';

import { useActivitiesQuery } from '@/hooks/useActivitiesParamsServer';

export type ActivityFilersProps = {
  loading?: boolean;
};

export const ActivityFilers = ({ loading }: ActivityFilersProps) => {
  const { setParam, params } = useActivitiesQuery();

  return (
    <div className="space-x-2 mt-2">
      <Badge
        variant={params.type === 'ticket_bought' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => setParam('type', 'ticket_bought')}
        aria-disabled={loading || params.type === 'ticket_bought'}
      >
        <Ticket />
        Tickets
      </Badge>
      <Badge
        variant={params.type === 'gift_added' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => setParam('type', 'gift_added')}
        aria-disabled={loading || params.type === 'gift_added'}
      >
        <Gift />
        Gifts
      </Badge>
      <Badge
        variant={params.type === 'voted' ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => setParam('type', 'voted')}
        aria-disabled={loading || params.type === 'voted'}
      >
        <Votes />
        Votes
      </Badge>
    </div>
  );
};
