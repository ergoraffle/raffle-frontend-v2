'use client';

import { SortDown, SortUp } from '@ergo-raffle/icons';
import { Button } from '@ergo-raffle/ui-kit';

import { useRafflesQuery } from '@/hooks';

export const RafflesSort = () => {
  const { params, setParam } = useRafflesQuery();

  return (
    <div className="flex items-center gap-2 float-right">
      <Button
        variant="white"
        onClick={() => setParam('sortBy', params.sortBy === 'Creation' ? 'Deadline' : 'Creation')}
      >
        Raffle {params.sortBy || 'Deadline'}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setParam('sort', params.sort === 'asc' ? 'desc' : 'asc')}
      >
        {params.sort === 'asc' ? <SortUp /> : <SortDown />}
      </Button>
    </div>
  );
};
