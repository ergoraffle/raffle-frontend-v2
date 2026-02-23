'use client';

import { useSearchParams } from 'next/navigation';

import type {
  GetRafflesParams,
  GetRafflesSort,
  GetRafflesSortBy,
  GetRafflesStatusItem
} from '@ergo-raffle/client';

export const useRafflesQuery = (defaults?: { page?: number; perPage?: number }) => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? defaults?.page ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? defaults?.perPage ?? 12);

  const sort = (searchParams.get('sort') ?? undefined) as GetRafflesSort | undefined;
  const sortBy = (searchParams.get('sortBy') ?? undefined) as GetRafflesSortBy | undefined;

  const status = searchParams.getAll('status') as GetRafflesStatusItem[];
  const token = searchParams.getAll('token');
  const category = searchParams.getAll('category');
  const name = searchParams.get('name') ?? undefined;

  const offset = (page - 1) * perPage;

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

  return { page, perPage, params };
};
