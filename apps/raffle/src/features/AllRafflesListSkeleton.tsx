import { Skeleton } from '@ergo-raffle/ui-kit';

import { RaffleListSkeleton } from './RaffleListSkeleton';
import { RafflesSort } from './RaffleSort';

export const AllRafflesListSkeleton = () => (
  <>
    <div className="flex justify-end lg:justify-between items-center mb-2 lg:mb-5">
      <Skeleton className="hidden lg:block w-96 h-4" />
      <RafflesSort />
    </div>
    <RaffleListSkeleton count={12} />
  </>
);
