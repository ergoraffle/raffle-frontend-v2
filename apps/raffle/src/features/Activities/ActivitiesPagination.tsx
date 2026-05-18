'use client';

import { Pagination } from '@ergo-raffle/ui-kit';

import { useActivitiesQuery } from '@/hooks/useActivitiesParamsServer';

export type ActivitiesPaginationProps = {
  total: number;
};

export const ActivitiesPagination = ({ total }: ActivitiesPaginationProps) => {
  const { page, perPage, setParam, getPageLink } = useActivitiesQuery();

  return (
    <Pagination
      page={page}
      perPage={perPage}
      perPageStep={6}
      onChangePerPage={(value) => setParam('perPage', value.toString())}
      getPageHref={getPageLink}
      total={total}
      align="side"
      className="mt-4 lg:mt-9"
    />
  );
};
