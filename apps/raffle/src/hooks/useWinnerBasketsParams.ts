'use client';

import { useMemo, useState } from 'react';

import type { GetRaffleRaffleIdBasketParams } from '@ergo-raffle/client';

export type WinnerBasketsTypeFilter = 'share' | 'empty' | 'gift' | 'share-gift';

const withGiftTypes = ['gift', 'share-gift'];
const withShareTypes = ['share', 'share-gift'];

export type FetchWinnerBasketsFilters = {
  withShare?: boolean;
  type?: WinnerBasketsTypeFilter;
  page: number;
  perPage: number;
};

export const useWinnerBasketsParams = () => {
  const [filters, setFilters] = useState<FetchWinnerBasketsFilters>({
    page: 1,
    perPage: 10
  });

  const offset = useMemo(
    () => (filters.page - 1) * filters.perPage,
    [filters.page, filters.perPage]
  );

  const onChangePage = (page: number) => setFilters({ ...filters, page });
  const onChangePerPage = (perPage: number) => setFilters({ ...filters, perPage });
  const onTypeFilterChange = (type: WinnerBasketsTypeFilter) =>
    setFilters({ ...filters, type: filters.type === type ? undefined : type });

  const params: GetRaffleRaffleIdBasketParams = useMemo(
    () => ({
      offset,
      limit: filters.perPage,
      share: filters.type
        ? withShareTypes.includes(filters.type)
          ? 'non-empty'
          : 'empty'
        : undefined,
      gift: filters.type
        ? withGiftTypes.includes(filters.type)
          ? 'non-empty'
          : 'empty'
        : undefined
    }),
    [offset, filters.perPage, filters.type]
  );
  return {
    params,
    type: filters.type,
    pagination: { page: filters.page, perPage: filters.perPage },
    onChangePage,
    onChangePerPage,
    onTypeFilterChange
  };
};
