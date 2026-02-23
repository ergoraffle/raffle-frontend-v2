'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { GetRafflesSort, GetRafflesSortBy } from '@ergo-raffle/client';

export const useRafflesSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSort = (sort: GetRafflesSort) => {
    const params = new URLSearchParams(searchParams);
    if (sort) params.set('sort', sort);
    router.push(`?${params.toString()}`);
  };
  const setSortBy = (sortBy: GetRafflesSortBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', sortBy);
    router.push(`?${params.toString()}`);
  };

  return { setSort, setSortBy };
};
