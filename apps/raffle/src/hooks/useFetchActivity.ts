'use client';

import { useEffect, useState } from 'react';

import type { RaffleActivity, RaffleActivityResponse } from '@ergo-raffle/client';

import { useActivityParams } from './useActivityParams';

const mockData: RaffleActivity[] = [
  {
    activityId: '1',
    type: 'gift_added',
    createdAt: Date.now(),
    wallet: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
  },
  {
    activityId: '2',
    type: 'ticket_bought',
    createdAt: Date.now(),
    wallet: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
  },
  {
    activityId: '3',
    type: 'upvoted',
    createdAt: Date.now(),
    wallet: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
  },
  {
    activityId: '4',
    type: 'downvoted',
    createdAt: Date.now(),
    wallet: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
  },
  {
    activityId: '5',
    type: 'raffle_created',
    createdAt: Date.now(),
    wallet: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
  },
  {
    activityId: '6',
    type: 'ticket_bought',
    createdAt: Date.now(),
    wallet: 'efsdvfpafdmvfspfmsvopsmvxsfbdpofmvspzmsbgm'
  }
];

export const useFetchActivity = (raffleId: string) => {
  const { params } = useActivityParams();
  const [data, setData] = useState<RaffleActivityResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const result = params.type ? mockData.filter((i) => i.type === params.type) : mockData;
      setData({ items: result.slice(0, 5), total: result.length });
      setIsLoading(false);
    }, 1000);
  }, [params]);

  return { ...data, isLoading, raffleId };
};
