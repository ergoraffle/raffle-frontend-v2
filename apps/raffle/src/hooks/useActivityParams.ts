'use client';

import { useMemo, useState } from 'react';

import type {
  GetActivity200ItemsItemType,
  GetActivityParams,
  GetActivityTypesAnyOfItem
} from '@ergo-raffle/client';

import { useWalletAddress } from './useWalletAddress';

export type FetchActivityFilters = {
  params?: GetActivityParams;
  page: number;
  perPage: number;
};

export const useActivityParams = (initialParams?: GetActivityParams) => {
  const walletAddress = useWalletAddress();
  const [filters, setFilters] = useState<FetchActivityFilters>({
    params: initialParams,
    page: 1,
    perPage: 6
  });

  const offset = (filters.page - 1) * filters.perPage;

  const onChangePage = (page: number) => setFilters({ ...filters, page });
  const onChangePerPage = (perPage: number) => setFilters({ ...filters, perPage });
  const onTypeFilterChange = (type: GetActivity200ItemsItemType) => {
    const filterTypes = filters.params?.types;
    const currentTypes = typeof filterTypes === 'string' ? [filterTypes] : filterTypes || [];
    let newTypes: GetActivityTypesAnyOfItem[] = [];
    if (currentTypes?.includes(type)) {
      newTypes = currentTypes.filter((t) => t !== type);
    } else {
      newTypes = [type, ...currentTypes];
    }
    setFilters({ ...filters, params: { ...filters.params, types: newTypes }, page: 1 });
  };
  const onAddressFilterChange = () => {
    setFilters({
      ...filters,
      params: { ...filters.params, address: params.address ? undefined : walletAddress },
      page: 1
    });
  };

  const params: GetActivityParams = useMemo(
    () => ({
      ...filters.params,
      offset,
      limit: filters.perPage
    }),
    [filters.params, offset, filters.perPage]
  );
  return {
    params,
    pagination: { page: filters.page, perPage: filters.perPage },
    onChangePage,
    onChangePerPage,
    onTypeFilterChange,
    onAddressFilterChange,
    walletAddress
  };
};
