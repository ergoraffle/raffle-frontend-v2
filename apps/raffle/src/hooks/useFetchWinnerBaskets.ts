'use client';

import { useEffect, useState } from 'react';

// import { fetchBasketsAction } from '@/features/mockApi';
import type { WinnerBasket, WinnerBasketListResponse } from '@ergo-raffle/client';

import { useWinnerBasketsParams } from './useWinnerBasketsParams';

const mockData: WinnerBasket[] = [
  {
    basketId: '1',
    share: 500,
    shareAmount: 50,
    sharePercent: 20,
    tokenId: 'sfsfsdfsdf',
    tokenName: 'erg'
  },
  {
    basketId: '2',
    share: 500,
    shareAmount: 50,
    sharePercent: 10,
    gifts: [
      {
        name: 'erg',
        amount: 200
      },
      {
        name: 'ada',
        amount: 50
      },
      {
        name: 'btc',
        amount: 200
      }
    ],
    tokenId: 'sfsfsdfsdf',
    tokenName: 'erg'
  }
];

export const useFetchWinnerBaskets = (raffleId: string) => {
  const { params } = useWinnerBasketsParams();
  const [data, setData] = useState<WinnerBasketListResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // fetchBasketsAction(raffleId, params)
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .finally(() => setIsLoading(false));
    setTimeout(() => {
      const result =
        params.type === 'gift' ? mockData.filter((i) => i.gifts && i.gifts.length > 0) : mockData;
      setData({ items: result.slice(0, 10), total: result.length });
      setIsLoading(false);
    }, 1000);
  }, [params]);

  return { ...data, isLoading, raffleId };
};
