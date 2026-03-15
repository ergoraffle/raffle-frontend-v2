import { Gift, Ticket, Votes } from '@ergo-raffle/icons';
import { Badge, Field, FieldLabel, Switch } from '@ergo-raffle/ui-kit';

import { useActivityParams } from '@/hooks/useActivityParams';

export const RaffleActivityFilers = () => {
  const { onTypeFilterChange, params } = useActivityParams();
  return (
    <div>
      <Field orientation="horizontal">
        <Switch />
        <FieldLabel>only my address</FieldLabel>
      </Field>
      <div className="space-x-2 mt-2">
        <Badge
          variant={params.type === 'ticket_bought' ? 'secondary' : 'elevated'}
          size="lg"
          className="cursor-pointer"
          onClick={() => onTypeFilterChange('ticket_bought')}
        >
          <Ticket />
          Tickets
        </Badge>
        <Badge
          variant={params.type === 'gift_added' ? 'secondary' : 'elevated'}
          size="lg"
          className="cursor-pointer"
          onClick={() => onTypeFilterChange('gift_added')}
        >
          <Gift />
          Gifts
        </Badge>
        <Badge
          variant={params.type === 'voted' ? 'secondary' : 'elevated'}
          size="lg"
          className="cursor-pointer"
          onClick={() => onTypeFilterChange('voted')}
        >
          <Votes />
          Votes
        </Badge>
      </div>
    </div>
  );
};
