'use client';

import { useEffect, useState } from 'react';

import type { BasketTransaction } from '@ergo-raffle/client';

import { winnerBasketTransactions } from '@/mockData';

export const useFetchTransactions = () => {
  const [data, setData] = useState<BasketTransaction[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(winnerBasketTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { data, isLoading };
};
