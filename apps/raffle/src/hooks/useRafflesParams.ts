'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import type {
  GetRaffleDirection,
  GetRaffleOrder,
  GetRaffleParams,
  GetRaffleStatusItem
} from '@ergo-raffle/client';

const doNotNeedResetPage = ['sort', 'sortBy', 'page'];

export const useRafflesQuery = (defaults?: { page?: number; perPage?: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const text = searchParams.get('text') ?? undefined;
  const [search, setSearch] = useState<string | undefined>(text);

  const page = Number(searchParams.get('page') ?? defaults?.page ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? defaults?.perPage ?? 12);

  const order = (searchParams.get('sort') ?? undefined) as GetRaffleOrder | undefined;
  const direction = (searchParams.get('direction') ?? undefined) as GetRaffleDirection | undefined;

  const status = searchParams.getAll('status') as GetRaffleStatusItem[];
  const tokenIds = searchParams.getAll('tokenIds');
  const ids = searchParams.getAll('ids');

  const offset = (page - 1) * perPage;

  const setParam = (key: string, value?: string | string[]) => {
    const params = new URLSearchParams(searchParams);

    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach((v) => {
        params.append(key, v);
      });
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (!doNotNeedResetPage.includes(key)) {
      params.set('page', '1');
    }
    router.push(`?${params.toString()}`);
  };

  const getPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    return `?${params.toString()}`;
  };

  const params: GetRaffleParams = {
    offset,
    limit: perPage,
    order,
    direction,
    status: status.length ? status : undefined,
    tokenIds: tokenIds.length ? tokenIds : undefined,
    ids: ids.length ? ids : undefined,
    text: text || undefined
  };

  return { page, perPage, params, search, setSearch, setParam, getPageLink };
};
