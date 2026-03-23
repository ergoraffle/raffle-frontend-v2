'use client';

import { useEffect, useState } from 'react';

import type { WinnerBasketDetailResponse } from '@ergo-raffle/client';

const mockData: WinnerBasketDetailResponse = {
  basketId: '2',
  sharePercent: 60,
  shareAmount: 100,
  tokenId: 'seffdcsfsfsfsdfsdfsdfsfsdgfhyyjhgjhujdthdgdg',
  tokenName: 'erg',
  gifts: [
    {
      id: 'gift1',
      basketId: '2',
      assets: [
        { tokenId: 'erg', tokenName: 'erg', amount: 10 },
        { tokenId: 'btc', tokenName: 'btc', amount: 20 }
      ]
    },
    { id: 'gift2', basketId: '2', assets: [{ tokenId: 'erg', tokenName: 'erg', amount: 10 }] }
  ],
  transactions: [
    {
      id: '123',
      amount: 129,
      type: 'asset_unwrap',
      wallet: '9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK',
      txId: 'seffdcsfsfsfsdfsdfsdfsfsdgfhyyjhgjhujdthdgdg',
      time: '2026-03-23T00:32:00Z'
    },
    {
      id: '456',
      amount: 2,
      type: 'ticket_won',
      wallet: '9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK',
      txId: 'seffdcsfsfsfsdfsdfsdfsfsdgfhyyjhgjhujdthdgdg',
      time: '2026-03-23T00:32:00Z'
    }
  ]
};

export const useFetchWinnerBasket = (basketId: string) => {
  const [data, setData] = useState<WinnerBasketDetailResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData({ ...mockData, basketId });
      setIsLoading(false);
    }, 1000);
  }, [basketId]);

  return { data, isLoading };
};
