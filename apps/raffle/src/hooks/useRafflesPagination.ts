'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useRafflesPagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? 12);
  const offset = (page - 1) * perPage;

  const getPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    return `?${params.toString()}`;
  };

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    router.push(`?${params.toString()}`);
  };

  const setPerPage = (newPerPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('perPage', String(newPerPage));
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return { page, perPage, offset, setPage, setPerPage, getPageLink };
};
