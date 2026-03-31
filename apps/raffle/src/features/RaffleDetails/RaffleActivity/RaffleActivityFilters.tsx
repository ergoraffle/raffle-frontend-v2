import { Gift, Ticket, Votes } from '@ergo-raffle/icons';
import { Badge, Field, FieldLabel, Switch } from '@ergo-raffle/ui-kit';

import { useActivityParams } from '@/hooks';

export type RaffleActivityFilersProps = {
  isLoading?: boolean;
};

export const RaffleActivityFilers = ({ isLoading }: RaffleActivityFilersProps) => {
  const { onTypeFilterChange, params } = useActivityParams();
  return (
    <div>
      <Field orientation="horizontal">
        <Switch disabled={isLoading} />
        <FieldLabel>Only my address</FieldLabel>
      </Field>
      <div className="space-x-2 mt-2">
        <Badge
          variant={params.type === 'ticket_bought' ? 'secondary' : 'elevated'}
          size="lg"
          className="cursor-pointer"
          onClick={() => onTypeFilterChange('ticket_bought')}
          aria-disabled={isLoading}
        >
          <Ticket />
          Tickets
        </Badge>
        <Badge
          variant={params.type === 'gift_added' ? 'secondary' : 'elevated'}
          size="lg"
          className="cursor-pointer"
          onClick={() => onTypeFilterChange('gift_added')}
          aria-disabled={isLoading}
        >
          <Gift />
          Gifts
        </Badge>
        <Badge
          variant={params.type === 'voted' ? 'secondary' : 'elevated'}
          size="lg"
          className="cursor-pointer"
          onClick={() => onTypeFilterChange('voted')}
          aria-disabled={isLoading}
        >
          <Votes />
          Votes
        </Badge>
      </div>
    </div>
  );
};
