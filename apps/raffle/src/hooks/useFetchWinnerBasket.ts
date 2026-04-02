'use client';

import { useEffect, useState } from 'react';

import type { WinnerBasketDetailResponse } from '@ergo-raffle/client';

import { winnerBasketDetail } from '@/mockData';

export const useFetchWinnerBasket = (basketId: string) => {
  const [data, setData] = useState<WinnerBasketDetailResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData({ ...winnerBasketDetail, basketId });
      setIsLoading(false);
    }, 1000);
  }, [basketId]);

  return { data, isLoading };
};
