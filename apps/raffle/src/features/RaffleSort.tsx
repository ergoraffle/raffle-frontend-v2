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
        onClick={() => setParam('sortBy', params.order === 'height' ? 'deadline' : 'height')}
      >
        Raffle {params.order === 'height' ? 'Creation' : 'Deadline'}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setParam('sort', params.direction === 'ASC' ? 'DESC' : 'ASC')}
      >
        {params.direction === 'ASC' ? <SortUp /> : <SortDown />}
      </Button>
    </div>
  );
};
