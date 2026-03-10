'use client';

import type {
  GetRafflesRaffleIdWinnerBasketsParams,
  GetRafflesRaffleIdWinnerBasketsType
} from '@ergo-raffle/client';
import { useMemo, useState } from 'react';

export type FetchWinnerBasketsFilters = {
  type?: GetRafflesRaffleIdWinnerBasketsType;
  page: number;
  perPage: number;
};

export const useFetchWinnerBasketsFilters = (): {
  params: GetRafflesRaffleIdWinnerBasketsParams;
  pagination: { page: number; perPage: number };
  onChangePage: (pageNumber: number) => void;
  onChangePerPage: (perPage: number) => void;
  onTypeFilterCHange: (type: GetRafflesRaffleIdWinnerBasketsType) => void;
} => {
  const [filters, setFilters] = useState<FetchWinnerBasketsFilters>({
    page: 1,
    perPage: 10
  });

  const offset = (filters.page - 1) * filters.perPage;

  const onChangePage = (page: number) => setFilters({ ...filters, page });
  const onChangePerPage = (perPage: number) => setFilters({ ...filters, perPage });
  const onTypeFilterCHange = (type: GetRafflesRaffleIdWinnerBasketsType) =>
    setFilters({ ...filters, type });
  const params = useMemo(
    () => ({ offset, limit: filters.perPage, type: filters.type }),
    [offset, filters.perPage, filters.type]
  );
  return {
    params,
    pagination: { page: filters.page, perPage: filters.perPage },
    onChangePage,
    onChangePerPage,
    onTypeFilterCHange
  };
};
