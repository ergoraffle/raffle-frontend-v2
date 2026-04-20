import {
  configureClient,
  type GetActivitiesParams,
  getActivities,
  withMock
} from '@ergo-raffle/client';
import { Card, CardContent, CardHeader, CardTitle, Empty, Typography } from '@ergo-raffle/ui-kit';

import { ActivityFilers } from './ActivitiesFilters';
import { ActivitiesPagination } from './ActivitiesPagination';
import { ActivityItem } from './ActivityItem';

export const runtime2 = 'nodejs';
export const dynamic2 = 'force-dynamic';

configureClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || `https://${process.env.VERCEL_URL}/api`
});

type ActivityProps = {
  params?: GetActivitiesParams;
};

export const Activities = async ({ params }: ActivityProps) => {
  const { items, total } = await withMock(async () => await getActivities(params));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Typography variant="heading-1">My Activities</Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ActivityFilers />
        {!items || items.length <= 0 ? (
          <div className="flex justify-center items-center grow my-9">
            <Empty>
              <Typography variant="heading-3">No matching results found.</Typography>
            </Empty>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((activity) => (
              <ActivityItem activity={activity} key={activity.id} />
            ))}
          </div>
        )}
        {!!total && <ActivitiesPagination total={total} />}
      </CardContent>
    </Card>
  );
};
