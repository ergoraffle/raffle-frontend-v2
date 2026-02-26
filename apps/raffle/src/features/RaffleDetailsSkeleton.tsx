import { Card, Skeleton } from '@ergo-raffle/ui-kit';

export const RaffleDetailsSkeleton = () => (
  <div className="flex gap-9.5">
    <div className="flex gap-9.5">
      <Card>
        <Skeleton />
      </Card>
    </div>
    <Card>
      <Skeleton />
    </Card>
  </div>
);
