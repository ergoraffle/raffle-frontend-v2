'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { GetActivitiesParams, GetActivitiesType } from '@ergo-raffle/client';

export const useActivitiesQuery = (defaults?: { page?: number; perPage?: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page') ?? defaults?.page ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? defaults?.perPage ?? 12);

  const type = searchParams.get('type') as GetActivitiesType;
  const address = searchParams.get('address') as string;

  const offset = (page - 1) * perPage;

  const setParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== 'page') {
      params.set('page', '1');
    }
    router.push(`?${params.toString()}`);
  };

  const getPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    return `?${params.toString()}`;
  };

  const params: GetActivitiesParams = {
    offset,
    limit: perPage,
    type,
    address
  };

  return { page, perPage, params, setParam, getPageLink };
};
