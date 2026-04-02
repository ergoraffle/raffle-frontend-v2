'use client';

import { Votes } from '@ergo-raffle/icons';
import { Button } from '@ergo-raffle/ui-kit';

export const RaffleVote = () => (
  <Button size="icon-sm" variant="plain">
    <Votes className="size-7" />
  </Button>
);
