import { Suspense } from 'react';

import { RaffleListSkeleton, RaffleListTabs } from '@/features';
import { getRafflesParamsTransformer } from '@/features/utils';

const Raffles = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  return (
    <Suspense fallback={<RaffleListSkeleton count={12} />}>
      <RaffleListTabs params={getRafflesParamsTransformer(params)} />
    </Suspense>
  );
};

export default Raffles;
