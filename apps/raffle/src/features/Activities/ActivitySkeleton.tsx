import { Card, CardContent, CardHeader, CardTitle, Typography } from '@ergo-raffle/ui-kit';

import { ActivityFilers } from './ActivitiesFilters';
import { ActivityItem } from './ActivityItem';

export const ActivitySkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>
        <Typography variant="heading-1">My Activities</Typography>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <ActivityFilers loading />
      <div className="w-full space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <ActivityItem loading key={index.toString()} />
        ))}
      </div>
    </CardContent>
  </Card>
);
