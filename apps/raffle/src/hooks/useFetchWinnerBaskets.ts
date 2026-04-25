'use client';

import { useEffect, useState } from 'react';

import {
  getRaffleRaffleIdBasket,
  type GetRaffleRaffleIdBasketParams,
  type WinnerBasketListResponse
} from '@ergo-raffle/client';

export const useFetchWinnerBaskets = (raffleId: string, params: GetRaffleRaffleIdBasketParams) => {
  const [data, setData] = useState<WinnerBasketListResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getRaffleRaffleIdBasket(raffleId, params).then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, [raffleId, params]);

  return { ...data, isLoading };
};
