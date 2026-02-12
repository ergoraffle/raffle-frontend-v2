'use client';

import { Empty, Typography } from '@ergo-raffle/ui-kit';
import { RaffleCard } from './raffle-card';
import { type GetRafflesParams, useGetRaffles } from '@ergo-raffle/client';
import Link from 'next/link';
import { Right } from '@ergo-raffle/icons';

interface Props {
  params?: GetRafflesParams;
}

export const RaffleList = ({ params }: Props) => {
  const { data, isLoading } = useGetRaffles(params);

  const limit = params?.pageSize;
  const items = data?.data.items ?? [];
  const total = data?.data.total ?? 0;

  if (!isLoading && items.length === 0) {
    return (
      <div className="flex justify-center items-center grow">
        <Empty>
          <Typography variant="heading-3">No raffles found.</Typography>
        </Empty>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-wrap gap-4 w-full">
        {items.slice(0, limit).map((raffle) => (
          <RaffleCard key={raffle.raffleId} raffle={raffle} />
        ))}
      </div>

      {limit && total > limit && (
        <Typography variant="heading-4" asChild className="mt-4">
          <Link href="/raffles" className="flex justify-center items-center gap-1">
            See more <Right className="size-6" />
          </Link>
        </Typography>
      )}
    </div>
  );
};
