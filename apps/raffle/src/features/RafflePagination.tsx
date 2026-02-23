'use client';

import { Pagination } from '@ergo-raffle/ui-kit';

import { useRafflesPagination } from '@/hooks/useRafflesPagination';

export type RafflesPaginationProps = {
  total: number;
};

export const RafflesPagination = ({ total }: RafflesPaginationProps) => {
  const { page, setPerPage, perPage, getPageLink } = useRafflesPagination();

  return (
    <Pagination
      page={page}
      perPage={perPage}
      onChangePerPage={setPerPage}
      getPageHref={getPageLink}
      showChangeLimitation
      total={total}
    />
  );
};
