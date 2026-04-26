'use client';

import { useEffect, useState } from 'react';

import type { GetTokensParams, TokensResponse } from '@ergo-raffle/client';

import { getTokens } from '@/actions';

export const useFetchTokens = (params: GetTokensParams) => {
  const [data, setData] = useState<TokensResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (params.tokenIds.length <= 0) {
      setData(undefined);
    } else {
      getTokens(params).then((res) => {
        setData(res);
        setIsLoading(false);
      });
    }
  }, [params]);

  return { data, isLoading };
};
