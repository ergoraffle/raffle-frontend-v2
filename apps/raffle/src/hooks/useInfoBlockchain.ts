'use client';

import { useEffect, useState } from 'react';

import type { InfoBlockchainResponse } from '@ergo-raffle/client';

export const useInfoBlockchain = () => {
  const [data, setData] = useState<InfoBlockchainResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: replace with real API call
        // const result = await getInfoBlockchain();
        const result = {
          fee: {
            tx: 15613,
            service: 61651651,
            implementer: 5,
            creation: 195161
          },
          height: 123456
        };
        setData(result);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
