import { HandCoin, SandClock, Ticket } from '@ergo-raffle/icons';
import { Card, CardContent, Skeleton, Typography } from '@ergo-raffle/ui-kit';

export type RaffleDetailsIconBoxProps = {
  loading?: boolean;
  lastBlockHeight?: number;
  soldTicketCount?: number;
};

export const RaffleDetailsIconBox = ({
  loading,
  lastBlockHeight,
  soldTicketCount
}: RaffleDetailsIconBoxProps) => {
  const deadline = lastBlockHeight ? lastBlockHeight - 1416515375925 : 0;
  return (
    <Card padding="lg">
      <CardContent className="flex items-center justify-between py-2 px-5.5">
        <div className="flex flex-col items-center justify-center gap-1">
          <SandClock className="size-13" />
          {loading ? (
            <div className="flex space-x-1">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
          ) : (
            <Typography variant="subtitle-lg">
              {deadline > 0
                ? `${Math.floor(deadline / (1000 * 60 * 60 * 24))} Days remaining`
                : `Ended ${Math.floor(Math.abs(deadline) / (1000 * 60 * 60 * 24))} Days ago`}
            </Typography>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
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
        <div className="flex flex-col items-center justify-center gap-1">
          <HandCoin className="size-13" />
          {/* Static */}
          {loading ? (
            <div className="flex space-x-1">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
          ) : (
            <Typography variant="subtitle-lg">0 Backer</Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
