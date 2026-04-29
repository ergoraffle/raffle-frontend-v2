'use client';

import { useEffect, useState } from 'react';

import type { WinnerBasketDetailResponse } from '@ergo-raffle/client';

import { winnerBasketDetail } from '@/mockData';

export const useFetchWinnerBasket = (basketIndex: number) => {
  const [data, setData] = useState<WinnerBasketDetailResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData({ ...winnerBasketDetail, index: basketIndex });
      setIsLoading(false);
    }, 1000);
  }, [basketIndex]);

  return { data, isLoading };
};
