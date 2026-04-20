import type { GetActivitiesParams } from '@ergo-raffle/client';
import { Card, CardContent, CardHeader, CardTitle, Empty, Typography } from '@ergo-raffle/ui-kit';

import { activities } from '@/mockData';

import { ActivityFilers } from './ActivitiesFilters';
import { ActivitiesPagination } from './ActivitiesPagination';
import { ActivityItem } from './ActivityItem';

type ActivityProps = {
  params?: GetActivitiesParams;
};

export const Activities = async ({ params }: ActivityProps) => {
  // const { items, total } = await getActivities(params);
  const { items, total } = activities;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Typography variant="heading-1">My Activities</Typography>
          {/* TODO: remove after connecting to api */}
          {params?.address}
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
