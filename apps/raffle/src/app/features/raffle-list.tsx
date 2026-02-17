import { type GetRafflesParams, getInfo, getRaffles } from '@ergo-raffle/client';
import { Empty, SeeMoreLink, Typography } from '@ergo-raffle/ui-kit';

import { RaffleCard } from './raffle-card';

interface Props {
  params?: GetRafflesParams;
  limit?: number;
}

export const RaffleList = async ({ params, limit }: Props) => {
  const limitedParams = limit ? { pageSize: limit, page: 1 } : {};
  const { items, total } = await getRaffles({ ...params, ...limitedParams });
  const infoData = await getInfo();

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
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5 w-full">
        {items.map((raffle) => {
          const raisedAmounts = {
            target: raffle.soldTicketCount * raffle.ticketPrice,
            current: raffle.goal,
            verified: true
          };

          const deadline = infoData.lastBlockHeight - Date.now();

          const trust = { value: 0, max: 100 };
          return (
            <RaffleCard
              key={raffle.raffleId}
              raffle={raffle}
              raisedAmounts={raisedAmounts}
              deadline={
                deadline > 0
                  ? `${Math.floor(deadline / (1000 * 60 * 60 * 24))} Days remaining`
                  : `Ended ${Math.floor(Math.abs(deadline) / (1000 * 60 * 60 * 24))} Days ago`
              }
              trust={trust}
            />
          );
        })}
      </div>

      {limit && total > limit && <SeeMoreLink href="/raffles" />}
      {!limit && total > items.length && (
        <Typography variant="body-md" className="text-gray-2 mt-4">
          Showing {items.length} of {total} raffles.
        </Typography>
      )}
    </div>
  );
};
