'use client';

import { useEffect, useState } from 'react';

import type { GetRaffleRaffleIdBasketParams, WinnerBasketListResponse } from '@ergo-raffle/client';

import { getRaffleBaskets } from '@/actions';

export const useFetchWinnerBaskets = (raffleId: string, params: GetRaffleRaffleIdBasketParams) => {
  const [data, setData] = useState<WinnerBasketListResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getRaffleBaskets(raffleId, params)
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [raffleId, params]);

  return { ...data, isLoading };
};
