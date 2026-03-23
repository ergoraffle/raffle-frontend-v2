'use client';

import { useEffect, useState } from 'react';

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
        id: 'gift1',
        basketId: '2',
        assets: [
          { tokenId: 'erg', tokenName: 'erg', amount: 10 },
          { tokenId: 'btc', tokenName: 'btc', amount: 20 }
        ]
      },
      { id: 'gift2', basketId: '2', assets: [{ tokenId: 'erg', tokenName: 'erg', amount: 10 }] },
      { id: 'gift3', basketId: '2', assets: [{ tokenId: 'ada', tokenName: 'ada', amount: 50 }] }
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
    setTimeout(() => {
      const result =
        params.type === 'gift' ? mockData.filter((i) => i.gifts && i.gifts.length > 0) : mockData;
      setData({ items: result.slice(0, 10), total: result.length });
      setIsLoading(false);
    }, 1000);
  }, [params]);

  return { ...data, isLoading, raffleId };
};
