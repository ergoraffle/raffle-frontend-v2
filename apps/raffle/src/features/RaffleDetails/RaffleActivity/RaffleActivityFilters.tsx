'use client';

import type { GetActivity200ItemsItemType, GetActivityParams } from '@ergo-raffle/client';
import { Gift, Ticket } from '@ergo-raffle/icons';
import { Badge, Field, FieldLabel, Switch, Tooltip } from '@ergo-raffle/ui-kit';

export type RaffleActivityFilersProps = {
  isLoading?: boolean;
  params: GetActivityParams;
  onTypeFilterChange: (type: GetActivity200ItemsItemType) => void;
  onAddressFilterChange: () => void;
  hasWalletAddress?: boolean;
};

export const RaffleActivityFilters = ({
  params,
  onTypeFilterChange,
  isLoading,
  onAddressFilterChange,
  hasWalletAddress
}: RaffleActivityFilersProps) => (
  <div>
    <div className="flex">
      <Tooltip content="Must be connected to a wallet" disabled={hasWalletAddress}>
        <Field orientation="horizontal">
          <Switch
            disabled={isLoading || !hasWalletAddress}
            checked={Boolean(params.address)}
            onClick={() => onAddressFilterChange()}
          />
          <FieldLabel>Only my address</FieldLabel>
        </Field>
      </Tooltip>
    </div>
    <div className="space-x-2 mt-2">
      <Badge
        variant={params.types?.includes('donation') ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('donation')}
        aria-disabled={isLoading}
      >
        <Ticket />
        Tickets
      </Badge>
      <Badge
        variant={params.types?.includes('gift') ? 'secondary' : 'elevated'}
        size="lg"
        className="cursor-pointer"
        onClick={() => onTypeFilterChange('gift')}
        aria-disabled={isLoading}
      >
        <Gift />
        Gifts
      </Badge>
    </div>
  </div>
);
