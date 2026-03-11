'use client';

import { Empty, Pagination, Typography } from '@ergo-raffle/ui-kit';

import { useActivityParams } from '@/hooks/useActivityParams';
import { useFetchActivity } from '@/hooks/useFetchActivity';

import { RaffleActivityFilers } from './RaffleActivityFilters';
import { RaffleActivityItem } from './RaffleActivityItem';

export type RaffleActivityProps = { raffleId: string };

export const RaffleActivity = ({ raffleId }: RaffleActivityProps) => {
  const { items, total, isLoading } = useFetchActivity(raffleId);
  const { pagination, onChangePage, onChangePerPage } = useActivityParams();

  if (!isLoading && !items?.length) {
    return (
      <div className="flex justify-center items-center grow my-9">
        <Empty>
          <Typography variant="heading-3">No matching results found.</Typography>
        </Empty>
      </div>
    );
  }
  return (
    <>
      <RaffleActivityFilers />
      <div className="space-y-2 mt-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <RaffleActivityItem key={index.toString()} loading />
            ))
          : items?.map((item) => <RaffleActivityItem key={item.activityId} activity={item} />)}
      </div>
      {items && total && total > items.length && !isLoading ? (
        <Pagination
          page={pagination.page}
          perPage={pagination.perPage}
          onChangePerPage={onChangePerPage}
          onChangePage={onChangePage}
          total={total}
          align="side"
          className="mt-4"
        />
      ) : null}
    </>
  );
};
