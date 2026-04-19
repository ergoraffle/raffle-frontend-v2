import { Suspense } from 'react';

import { AllRafflesListSkeleton, RaffleList, RafflesFilters } from '@/features';
import { getRafflesParamsTransformer } from '@/features/utils';

const Raffles = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  return (
    <>
      <RafflesFilters />
      <Suspense key={JSON.stringify(params)} fallback={<AllRafflesListSkeleton />}>
        <RaffleList params={getRafflesParamsTransformer(params)} pined={Boolean(params.pined)} />
      </Suspense>
    </>
  );
};

export default Raffles;
