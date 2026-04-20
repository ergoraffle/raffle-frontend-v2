'use client';

import { useEffect, useState } from 'react';

import { getInfoBlockchain, type InfoBlockchainResponse } from '@ergo-raffle/client';

export const useInfoBlockchain = () => {
  const [data, setData] = useState<InfoBlockchainResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInfoBlockchain();
        setData(result);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
