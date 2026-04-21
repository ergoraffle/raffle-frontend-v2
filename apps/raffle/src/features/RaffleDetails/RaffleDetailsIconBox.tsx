import type { RaffleDetailResponse } from '@ergo-raffle/client';
import { HandCoin, SandClock, Ticket } from '@ergo-raffle/icons';
import { Card, CardContent, Skeleton, Typography } from '@ergo-raffle/ui-kit';

import { getDeadlineString } from '@/features/utils';

export type RaffleDetailsIconBoxProps = {
  loading?: boolean;
  deadline?: number;
  soldTicketCount?: number;
  backers?: RaffleDetailResponse['backers'];
};

export const RaffleDetailsIconBox = ({
  loading,
  deadline,
  soldTicketCount,
  backers
}: RaffleDetailsIconBoxProps) => (
  <Card padding="lg">
    <CardContent className="flex justify-between sm:py-2 sm:px-5.5 text-center">
      <div className="flex flex-col items-center gap-1 flex-1 sm:flex-auto">
        <SandClock className="size-13" />
        {loading ? (
          <div className="flex space-x-1">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          <Typography variant="subtitle-lg">{getDeadlineString(deadline ?? 0)}</Typography>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 flex-1 sm:flex-auto">
        <Ticket className="size-13" />
        {loading ? (
          <div className="flex space-x-1">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          <Typography variant="subtitle-lg">{soldTicketCount ?? 0} Ticket Bought</Typography>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 flex-1 sm:flex-auto">
        <HandCoin className="size-13" />
        {loading ? (
          <div className="flex space-x-1">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          <Typography variant="subtitle-lg">{backers ?? 0} Backer</Typography>
        )}
      </div>
    </CardContent>
  </Card>
);
