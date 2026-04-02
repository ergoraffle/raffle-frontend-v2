'use client';

import { useMemo, useState } from 'react';

import type { GetRafflesRaffleIdActivitiesType } from '@ergo-raffle/client';

export type FetchActivityFilters = {
  type?: GetRafflesRaffleIdActivitiesType;
  onlyMyAddress?: boolean;
  page: number;
  perPage: number;
};

export const useActivityParams = () => {
  const [filters, setFilters] = useState<FetchActivityFilters>({
    page: 1,
    perPage: 5
  });

  const offset = (filters.page - 1) * filters.perPage;

  const onChangePage = (page: number) => setFilters({ ...filters, page });
  const onChangePerPage = (perPage: number) => setFilters({ ...filters, perPage });
  const onTypeFilterChange = (type: GetRafflesRaffleIdActivitiesType) =>
    setFilters({ ...filters, type });
  const params = useMemo(
    () => ({
      offset,
      limit: filters.perPage,
      type: filters.type,
      onlyMyAddress: filters.onlyMyAddress
    }),
    [offset, filters.perPage, filters.type, filters.onlyMyAddress]
  );
  return {
    params,
    pagination: { page: filters.page, perPage: filters.perPage },
    onChangePage,
    onChangePerPage,
    onTypeFilterChange
  };
};
