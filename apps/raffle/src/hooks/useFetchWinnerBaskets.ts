'use client';

import { fetchBasketsAction } from '@/features/mockApi';
import type { WinnerBasketListResponse } from '@ergo-raffle/client';
import { useEffect, useState } from 'react';
import { useFetchWinnerBasketsFilters } from './useFetchWinnerBasketsFilters';

export const useFetchWinnerBaskets = (raffleId: string) => {
  const { params } = useFetchWinnerBasketsFilters();
  const [data, setData] = useState<WinnerBasketListResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // fetchBasketsAction(raffleId, params)
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .finally(() => setIsLoading(false));
  }, [raffleId, params]);

  return { ...data, isLoading };
};
