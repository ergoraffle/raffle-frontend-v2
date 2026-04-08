'use client';

import { useMemo, useState } from 'react';

import type { GetActivitiesParams, GetActivitiesType } from '@ergo-raffle/client';

export type FetchActivityFilters = {
  params?: GetActivitiesParams;
  page: number;
  perPage: number;
};

export const useActivityParams = (initialParams?: GetActivitiesParams) => {
  const [filters, setFilters] = useState<FetchActivityFilters>({
    params: initialParams,
    page: 1,
    perPage: 5
  });

  const offset = (filters.page - 1) * filters.perPage;

  const onChangePage = (page: number) => setFilters({ ...filters, page });
  const onChangePerPage = (perPage: number) => setFilters({ ...filters, perPage });
  const onTypeFilterChange = (type: GetActivitiesType) => {
    if (filters.params?.type === type) {
      setFilters({ ...filters, params: { ...filters.params, type: undefined } });
    } else {
      setFilters({ ...filters, params: { ...filters.params, type } });
    }
  };
  const onAddressFilterChange = (address?: string) => {
    setFilters({ ...filters, params: { ...filters.params, address } });
  };

  const params: GetActivitiesParams = useMemo(
    () => ({
      ...filters.params,
      offset,
      limit: filters.perPage
    }),
    [filters.params, filters.params?.type, offset, filters.perPage]
  );
  return {
    params,
    pagination: { page: filters.page, perPage: filters.perPage },
    onChangePage,
    onChangePerPage,
    onTypeFilterChange,
    onAddressFilterChange
  };
};
