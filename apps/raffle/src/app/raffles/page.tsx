import { Suspense } from 'react';

import { RaffleListSkeleton, RaffleListTabs } from '@/features';

const Raffles = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  return (
    <Suspense fallback={<RaffleListSkeleton count={12} />}>
      <RaffleListTabs params={params} />
    </Suspense>
  );
};

export default Raffles;
