'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type {
  GetRafflesParams,
  GetRafflesSort,
  GetRafflesSortBy,
  GetRafflesStatusItem
} from '@ergo-raffle/client';

export const useRafflesQuery = (defaults?: { page?: number; perPage?: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const doNotNeedResetPage = ['sort', 'sortBy', 'page'];

  const page = Number(searchParams.get('page') ?? defaults?.page ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? defaults?.perPage ?? 12);

  const sort = (searchParams.get('sort') ?? undefined) as GetRafflesSort | undefined;
  const sortBy = (searchParams.get('sortBy') ?? undefined) as GetRafflesSortBy | undefined;

  const status = searchParams.getAll('status') as GetRafflesStatusItem[];
  const token = searchParams.getAll('token');
  const category = searchParams.getAll('category');
  const name = searchParams.get('name') ?? undefined;

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

  const params: GetRafflesParams = {
    offset,
    limit: perPage,
    sort,
    sortBy,
    status: status.length ? status : undefined,
    token: token.length ? token : undefined,
    category: category.length ? category : undefined,
    name: name || undefined
  };

  return { page, perPage, params, setParam, getPageLink };
};
