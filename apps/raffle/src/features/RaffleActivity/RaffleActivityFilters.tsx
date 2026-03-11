import { Gift, Ticket, Votes } from '@ergo-raffle/icons';
import { Badge, Field, FieldLabel, Switch } from '@ergo-raffle/ui-kit';

export const RaffleActivityFilers = () => (
  <div>
    <Field orientation="horizontal">
      <Switch />
      <FieldLabel>only my address</FieldLabel>
    </Field>
    <div className="space-x-2 mt-2">
      <Badge variant="elevated">
        <Ticket />
        Tickets
      </Badge>
      <Badge variant="elevated">
        <Gift />
        Gifts
      </Badge>
      <Badge variant="elevated">
        <Votes />
        Votes
      </Badge>
    </div>
  </div>
);
