import { Suspense } from 'react';

import { Activities, ActivitySkeleton } from '@/features/Activities';
import { getActivityParamsTransformer } from '@/features/utils';

const ActivityPage = async ({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ address: string }>;
}) => {
  const queryParams = await searchParams;
  const { address } = await params;
  return (
    <Suspense key={JSON.stringify(params)} fallback={<ActivitySkeleton />}>
      <Activities params={getActivityParamsTransformer(queryParams)} address={address} />
    </Suspense>
  );
};

export default ActivityPage;
