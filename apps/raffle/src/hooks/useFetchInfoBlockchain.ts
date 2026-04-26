'use client';

import { useEffect, useState } from 'react';

import type { InfoBlockchainResponse } from '@ergo-raffle/client';
import { getInfoBlockchain } from '@/actions';

export const useFetchInfoBlockchain = () => {
  const [data, setData] = useState<InfoBlockchainResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getInfoBlockchain().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  return { ...data, isLoading };
};
