'use client';

import { Pagination } from '@ergo-raffle/ui-kit';

import { useRafflesQuery } from '@/hooks/useRafflesParams';

export type RafflesPaginationProps = {
  total: number;
};

export const RafflesPagination = ({ total }: RafflesPaginationProps) => {
  const { page, perPage, setParam, getPageLink } = useRafflesQuery();

  return (
    <Pagination
      page={page}
      perPage={perPage}
      onChangePerPage={(value) => setParam('perPage', value.toString())}
      getPageHref={getPageLink}
      total={total}
      className="mt-4 lg:mt-9"
    />
  );
};
