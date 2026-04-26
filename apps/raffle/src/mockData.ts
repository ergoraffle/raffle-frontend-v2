import type {
  RaffleActivityResponse,
  WinnerBasketDetailResponse,
  WinnerBasketListResponse
} from '@ergo-raffle/client';

export const raffleActivity: RaffleActivityResponse = {
  items: [
    {
      id: '1',
      type: 'gift_added',
      createdAt: Date.now(),
      address: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
    },
    {
      id: '2',
      type: 'basket_won',
      createdAt: Date.now(),
      address: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm',
      basketNumber: '5',
      basketType: 'empty'
    },
    {
      id: '10',
      type: 'basket_won',
      createdAt: Date.now(),
      address: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm',
      basketNumber: '5',
      basketType: 'shared'
    },
    {
      id: '3',
      type: 'upvoted',
      createdAt: Date.now(),
      address: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
    },
    {
      id: '4',
      type: 'downvoted',
      createdAt: Date.now(),
      address: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm',
      amount: 5
    },
    {
      id: '5',
      type: 'raffle_created',
      createdAt: Date.now(),
      address: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
    },
    {
      id: '6',
      type: 'ticket_bought',
      createdAt: Date.now(),
      address: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm',
      amount: 5
    },
    {
      id: '7',
      type: 'raising_money',
      createdAt: Date.now(),
      address: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm',
      amount: 5,
      raffleId: '123',
      raffleName: 'xyz'
    }
  ],
  total: 6
};

export const winnerBaskets: WinnerBasketListResponse = {
  items: [
    {
      basketId: '1',
      shareAmount: 50,
      sharePercent: 20,
      gifts: [],
      type: 'empty'
    },
    {
      basketId: '2',
      shareAmount: 50,
      sharePercent: 10,
      type: 'shared',
      gifts: [
        {
          asset: 'btc',
          amount: 10,
          verified: true
        },
        {
          asset: 'ada',
          amount: 10,
          verified: true
        }
      ]
    }
  ],
  total: 2
};

export const winnerBasketDetail: WinnerBasketDetailResponse = {
  index: 2,
  sharePercent: 60,
  shareAmount: 100,
  type: 'shared',
  tokenId: 'tgksfsdfjfsdjfsdncsjdncsdjfsnjfsnfdsjfnsjfnsjfnsjf',
  tokenName: 'erg',
  gifts: [
    {
      tokenId: 'sfsdfsdfsfsfsf',
      amount: 50
    }
  ],
  transactions: [
    {
      id: '123',
      amount: 129,
      type: 'asset_unwrap',
      wallet: '9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK',
      address: 'seffdcsfsfsfsdfsdfsdfsfsdgfhyyjhgjhujdthdgdg',
      createdAt: '2026-03-23T00:32:00Z'
    },
    {
      id: '456',
      amount: 2,
      type: 'ticket_won',
      wallet: '9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK9i2AVTdK',
      address: 'seffdcsfsfsfsdfsdfsdfsfsdgfhyyjhgjhujdthdgdg',
      createdAt: '2026-03-23T00:32:00Z'
    }
  ]
};

export const activities: RaffleActivityResponse = {
  items: [
    {
      id: 'NuIPFgCNvcKlujsiCYWX',
      type: 'raising_money',
      address: 'hiHbbfOIxQUF',
      amount: null,
      basketType: 'IAGZueiICPFHPsl',
      raffleName: 'JQQIcKIOJH',
      raffleId: 'dtciCFPejtYBVUVf',
      createdAt: 5041485291298592
    }
  ],
  total: 1
};
