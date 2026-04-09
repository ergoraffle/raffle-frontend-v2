'use client';

import { useEffect, useState } from 'react';

import type { GetActivitiesParams, RaffleActivityResponse } from '@ergo-raffle/client';

import { raffleActivity } from '@/mockData';

export const useFetchActivity = (params?: GetActivitiesParams) => {
  const [data, setData] = useState<RaffleActivityResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const result = params?.type
        ? raffleActivity.items.filter((i) => i.type === params.type)
        : raffleActivity.items;
      setData({ items: result, total: result.length });
      setIsLoading(false);
    }, 1000);
  }, [params]);

  return { ...data, isLoading };
};
