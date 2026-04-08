import { Suspense } from 'react';

import { Activities, ActivitySkeleton } from '@/features/Activities';

const ActivityPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  return (
    <Suspense key={JSON.stringify(params)} fallback={<ActivitySkeleton />}>
      <Activities params={params} />
    </Suspense>
  );
};

export default ActivityPage;
