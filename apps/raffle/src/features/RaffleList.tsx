import { type GetRaffleParams, getInfoBlockchain, getRaffle } from '@ergo-raffle/client';
import { Empty, SeeMoreLink, Typography } from '@ergo-raffle/ui-kit';

import { toQueryString } from '@/lib/utils';

import { RaffleCard } from './RaffleCard';
import { RafflesPagination } from './RafflePagination';
import { RafflesSort } from './RaffleSort';

type Props = {
  params?: GetRaffleParams;
  limit?: number;
  pined?: boolean;
};

export const RaffleList = async ({ params, limit, pined }: Props) => {
  const limitedParams = limit ? { limit, offset: 0 } : {};

  const { items, total } = await getRaffle({ ...params, ...limitedParams });

  const infoData = await getInfoBlockchain();

  if (items.length === 0 || (pined && (!params?.ids || params.ids.length === 0))) {
    return (
      <div className="flex justify-center items-center grow">
        <Empty>
          <Typography variant="heading-3">No matching results found.</Typography>
        </Empty>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full mb-52">
      {!limit && (
        <div className="flex justify-end lg:justify-between items-center mb-2 lg:mb-5">
          <Typography variant="heading-5" className="hidden lg:block">
            {total > items.length && `Showing ${items.length} of ${total} Raffles:`}
          </Typography>
          <RafflesSort />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 w-full clear-both">
        {items.map((raffle) => (
          <RaffleCard
            key={raffle.id}
            raffle={raffle}
            deadline={raffle.deadline - infoData.height}
          />
        ))}
      </div>

      {limit && total > limit && (
        <SeeMoreLink href={`/raffles${params ? `?${toQueryString(params)}` : ''}`} />
      )}
      {!limit && total > items.length && <RafflesPagination total={total} />}
    </div>
  );
};
