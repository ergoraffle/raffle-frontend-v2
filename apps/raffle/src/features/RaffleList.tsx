import {
  configureClient,
  type GetRaffleParams,
  getInfo,
  getRaffle,
  withMock
} from '@ergo-raffle/client';
import { Empty, SeeMoreLink, Typography } from '@ergo-raffle/ui-kit';

import { toQueryString } from '@/lib/utils';

import { RaffleCard } from './RaffleCard';
import { RafflesPagination } from './RafflePagination';
import { RafflesSort } from './RaffleSort';
import { getDeadlineAmount } from './utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

configureClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

type Props = {
  params?: GetRaffleParams;
  limit?: number;
};

export const RaffleList = async ({ params, limit }: Props) => {
  const limitedParams = limit ? { limit, offset: 0 } : {};

  const { items, total } = await getRaffle({ ...params, ...limitedParams });

  const infoData = await withMock(async () => await getInfo());

  if (items.length === 0) {
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
        {items.map((raffle) => {
          const raisedAmounts = {
            target: raffle.amount.raised * raffle.ticketPrice,
            current: raffle.amount.goal,
            verified: raffle.token?.verified || false
          };

          const deadline = getDeadlineAmount(raffle.deadline, infoData.lastBlockHeight);

          const trust = { value: 0, max: 100 };
          return (
            <RaffleCard
              key={raffle.id}
              raffle={raffle}
              raisedAmounts={raisedAmounts}
              deadline={deadline}
              trust={trust}
            />
          );
        })}
      </div>

      {limit && total > limit && (
        <SeeMoreLink href={`/raffles${params ? `?${toQueryString(params)}` : ''}`} />
      )}
      {!limit && total > items.length && <RafflesPagination total={total} />}
    </div>
  );
};
