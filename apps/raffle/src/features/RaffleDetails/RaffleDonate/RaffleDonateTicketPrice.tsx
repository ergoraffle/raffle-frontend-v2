import type { GetRaffleRaffleId200 } from '@ergo-raffle/client';
import { Typography } from '@ergo-raffle/ui-kit';

import { getDecimalString } from '@/lib';

export type RaffleDonateTicketPriceProps = {
  ticketCount: number;
  raffle: GetRaffleRaffleId200;
};

export const RaffleDonateTicketPrice = ({ ticketCount, raffle }: RaffleDonateTicketPriceProps) => (
  <div>
    <Typography variant="body-lg">
      You are about to purchase {ticketCount} tickets for the raffle “{raffle.name}” how do you wish
      to proceed?
    </Typography>
    <Typography variant="body-sm">
      Price per ticket:{' '}
      <Typography variant="body-md" asChild>
        <span>{`${getDecimalString(raffle.ticketPrice, raffle.token.decimals)} ${raffle.token.name}`}</span>
      </Typography>
    </Typography>
    <Typography variant="body-sm">
      Total:{' '}
      <Typography variant="body-md" asChild>
        <span>{`${getDecimalString(raffle.ticketPrice * ticketCount, raffle.token.decimals)} ${raffle.token.name}`}</span>
      </Typography>
    </Typography>
  </div>
);
