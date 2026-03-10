'use client';

import { Pagination } from '@ergo-raffle/ui-kit';
import { RaffleActivityFilers } from './RaffleActivityFilters';
import { RaffleActivityItem } from './RaffleActivityItem';

export const RaffleActivity = () => {
  const onChangePage = (pageNumber: number) => {
    console.log(pageNumber);
  };
  return (
    <div className="space-y-4">
      <RaffleActivityFilers />
      <div className="space-y-2">
        <RaffleActivityItem />
        <RaffleActivityItem />
      </div>
      <Pagination
        page={1}
        perPage={5}
        onChangePerPage={onChangePage}
        onChangePage={onChangePage}
        total={30}
      />
    </div>
  );
};
