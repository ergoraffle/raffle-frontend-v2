'use client';

import { useEffect, useState } from 'react';

import type { WinnerBasketListResponse } from '@ergo-raffle/client';

import { winnerBaskets } from '@/mockData';

import { useWinnerBasketsParams } from './useWinnerBasketsParams';

export const useFetchWinnerBaskets = (raffleId: string) => {
  const { params } = useWinnerBasketsParams();
  const [data, setData] = useState<WinnerBasketListResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const result =
        params.type === 'gift'
          ? winnerBaskets.items.filter((i) => i.gifts && i.gifts.length > 0)
          : winnerBaskets.items;
      setData({ items: result.slice(0, 10), total: result.length });
      setIsLoading(false);
    }, 1000);
  }, [params]);

  return { ...data, isLoading, raffleId };
};
