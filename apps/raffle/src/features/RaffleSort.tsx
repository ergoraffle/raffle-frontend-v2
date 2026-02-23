'use client';

import { SortDown, SortUp } from '@ergo-raffle/icons';
import { Button } from '@ergo-raffle/ui-kit';

import { useRafflesQuery } from '@/hooks/useRafflesQuery';
import { useRafflesSort } from '@/hooks/useRafflesSort';

export const RafflesSort = () => {
  const { params } = useRafflesQuery();
  const { setSort, setSortBy } = useRafflesSort();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="white"
        onClick={() => setSortBy(params.sortBy === 'Creation' ? 'Deadline' : 'Creation')}
      >
        Raffle {params.sortBy || 'Deadline'}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSort(params.sort === 'asc' ? 'desc' : 'asc')}
      >
        {params.sort === 'asc' ? <SortUp /> : <SortDown />}
      </Button>
    </div>
  );
};
