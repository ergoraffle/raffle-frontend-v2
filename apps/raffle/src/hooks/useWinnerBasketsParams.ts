'use client';

import { useMemo, useState } from 'react';

import type { GetRaffleRaffleIdBasketParams } from '@ergo-raffle/client';

export type FetchWinnerBasketsFilters = {
  withShare?: boolean;
  withGift?: boolean;
  page: number;
  perPage: number;
};

export const useWinnerBasketsParams = () => {
  const [filters, setFilters] = useState<FetchWinnerBasketsFilters>({
    page: 1,
    perPage: 10
  });

  const offset = (filters.page - 1) * filters.perPage;

  const onChangePage = (page: number) => setFilters({ ...filters, page });
  const onChangePerPage = (perPage: number) => setFilters({ ...filters, perPage });
  const onTypeFilterChange = (withShare: boolean, withGift: boolean) =>
    setFilters({ ...filters, withShare, withGift });

  const params: GetRaffleRaffleIdBasketParams = useMemo(
    () => ({
      offset,
      limit: filters.perPage,
      withShare: filters.withShare,
      withGift: filters.withGift
    }),
    [offset, filters.perPage, filters.withGift, filters.withShare]
  );
  return {
    params,
    pagination: { page: filters.page, perPage: filters.perPage },
    onChangePage,
    onChangePerPage,
    onTypeFilterChange
  };
};
