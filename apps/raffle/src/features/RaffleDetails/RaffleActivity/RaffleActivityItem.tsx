'use client';

import type { GetActivity200ItemsItem } from '@ergo-raffle/client';
import { Card, CardContent, Identifier, Skeleton, Typography } from '@ergo-raffle/ui-kit';

import { activityRenderMap } from '@/features/activityRenderMap';
import { formatDateTime } from '@/lib';

export type RaffleActivityItemProps = { activity?: GetActivity200ItemsItem; loading?: boolean };

export const RaffleActivityItem = ({ activity, loading }: RaffleActivityItemProps) => {
  const config = activity ? activityRenderMap[activity.type] : undefined;

  return (
    <div className="flex items-stretch space-x-2">
      <Card padding="xs" className="sm:flex-2">
        <CardContent className="flex items-center space-x-1  my-auto">
          {loading ? (
            <>
              <Skeleton className="size-6" />
              <Skeleton className="w-20 h-3 hidden sm:block" />
            </>
          ) : (
            <>
              {config?.icon}
              <Typography variant="body-md" className="hidden sm:block">
                {config?.shortText(activity)}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <Card padding="xs" className="grow">
        <CardContent className="flex items-center justify-between space-x-1 text-gray-2 my-auto">
          <div className="max-w-30 sm:max-w-70">
            {loading ? (
              <Skeleton className="h-2 w-70" />
            ) : (
              <Identifier size="lg" value={activity?.address} />
            )}
          </div>
          {loading ? (
            <Skeleton className="h-1.5 w-10" />
          ) : (
            <Typography variant="subtitle-sm">
              {activity?.timestamp ? formatDateTime(activity.timestamp) : ''}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
