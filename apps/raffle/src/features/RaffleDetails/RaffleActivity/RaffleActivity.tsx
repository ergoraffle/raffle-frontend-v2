'use client';

import { Empty, Pagination, Typography } from '@ergo-raffle/ui-kit';

import { useActivityParams, useFetchActivity } from '@/hooks';

import { RaffleActivityFilters } from './RaffleActivityFilters';
import { RaffleActivityItem } from './RaffleActivityItem';

export type RaffleActivityProps = { raffleId: string };

export const RaffleActivity = ({ raffleId }: RaffleActivityProps) => {
  const {
    pagination,
    onChangePage,
    onChangePerPage,
    params,
    onTypeFilterChange,
    onAddressFilterChange
  } = useActivityParams({ raffleId });
  const { items, total, isLoading } = useFetchActivity(params);

  return (
    <>
      <RaffleActivityFilters
        isLoading={isLoading}
        params={params}
        onTypeFilterChange={onTypeFilterChange}
        onAddressFilterChange={onAddressFilterChange}
      />
      <div className="space-y-2 mt-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <RaffleActivityItem key={index.toString()} loading />
          ))
        ) : !isLoading && !items?.length ? (
          <div className="flex justify-center items-center grow my-9">
            <Empty>
              <Typography variant="heading-3">No matching results found.</Typography>
            </Empty>
          </div>
        ) : (
          items?.map((item) => <RaffleActivityItem key={item.id} activity={item} />)
        )}
      </div>
      {/* {!isLoading && items && total ? (
        <Pagination
          page={pagination.page}
          perPage={pagination.perPage}
          onChangePerPage={onChangePerPage}
          onChangePage={onChangePage}
          total={total}
          align="side"
          className="mt-4"
        />
      ) : null} */}
    </>
  );
};
