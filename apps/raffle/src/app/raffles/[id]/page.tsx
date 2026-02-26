import { Suspense } from 'react';

import { RaffleDetails } from '@/features/RaffleDetails';
import { RaffleDetailsSkeleton } from '@/features/RaffleDetailsSkeleton';

const RaffleDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <Suspense key={JSON.stringify(id)} fallback={<RaffleDetailsSkeleton />}>
      <RaffleDetails raffleId={id} />
    </Suspense>
  );
};

export default RaffleDetailsPage;
