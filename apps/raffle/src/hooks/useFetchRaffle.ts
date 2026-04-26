'use client';

import { useEffect, useState } from 'react';

import type { RaffleDetailResponse } from '@ergo-raffle/client';
import { getRaffle } from '@/actions';

export const useFetchRaffle = (raffleId: string) => {
  const [data, setData] = useState<RaffleDetailResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getRaffle(raffleId).then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, [raffleId]);

  return { data, isLoading };
};
