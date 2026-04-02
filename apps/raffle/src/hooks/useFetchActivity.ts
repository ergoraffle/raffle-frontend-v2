'use client';

import { useEffect, useState } from 'react';

import type { RaffleActivityResponse } from '@ergo-raffle/client';

import { raffleActivity } from '@/mockData';

import { useActivityParams } from './useActivityParams';

export const useFetchActivity = (raffleId: string) => {
  const { params } = useActivityParams();
  const [data, setData] = useState<RaffleActivityResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const result = params.type
        ? raffleActivity.items.filter((i) => i.type === params.type)
        : raffleActivity.items;
      setData({ ...raffleActivity, items: result });
      setIsLoading(false);
    }, 1000);
  }, [params]);

  return { ...data, isLoading, raffleId };
};
