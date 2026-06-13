import { HandCoin, SandClock, Ticket } from '@ergo-raffle/icons';
import { Card, CardContent, Skeleton, Typography } from '@ergo-raffle/ui-kit';

import { getDeadlineString } from '@/features/utils';

import type { RaffleDetailView } from './raffleToViewModel';

export type RaffleDetailsIconBoxProps = {
  loading?: boolean;
  raffle?: RaffleDetailView;
};

export const RaffleDetailsIconBox = ({ loading, raffle }: RaffleDetailsIconBoxProps) => (
  <Card padding="lg" shadow>
    <CardContent className="flex sm:py-2 sm:px-5.5 text-center">
      <div className="flex flex-col items-center gap-1 flex-1">
        <SandClock className="size-13" />
        {loading ? (
          <div className="flex space-x-1">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          <Typography variant="subtitle-lg">
            {getDeadlineString(raffle?.deadlineAmount ?? 0)}
          </Typography>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 flex-1">
        <Ticket className="size-13" />
        {loading ? (
          <div className="flex space-x-1">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          <Typography variant="subtitle-lg">
            {raffle?.soldTicketCount ?? 0} Ticket Bought
          </Typography>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 flex-1">
        <HandCoin className="size-13" />
        {loading ? (
          <div className="flex space-x-1">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          <Typography variant="subtitle-lg">{raffle?.backerCount ?? 0} Backer</Typography>
        )}
      </div>
    </CardContent>
  </Card>
);
