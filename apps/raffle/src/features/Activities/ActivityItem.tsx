import type { RaffleActivity } from '@ergo-raffle/client';
import { Button, Card, CardContent, Skeleton, Typography } from '@ergo-raffle/ui-kit';

import { activityRenderMap, activityStatusRenderMap } from '@/features/activityRenderMap';
import { formatDateTime } from '@/lib/utils';

export type ActivityItemProps = { activity?: RaffleActivity; loading?: boolean };

export const ActivityItem = ({ activity, loading }: ActivityItemProps) => {
  const config = activity ? activityRenderMap[activity.type] : undefined;

  return (
    <Card padding="xs">
      <CardContent className="flex items-center space-x-3 my-auto">
        {loading ? (
          <Skeleton className="size-10 rounded-full" />
        ) : (
          <div className="rounded-full bg-gray-5 size-10 flex items-center justify-center">
            {config?.icon}
          </div>
        )}
        <div className="grow">
          {loading ? (
            <Skeleton className="h-2 w-20 sm:w-50 mb-2" />
          ) : (
            <Typography variant="heading-5">{config?.text(activity)}</Typography>
          )}
          <div className="flex justify-between">
            {loading ? (
              <Skeleton className="h-1.5 w-10 sm:w-20" />
            ) : activity?.status ? (
              <Typography
                variant="subtitle-md"
                className={activityStatusRenderMap[activity.status].color}
              >
                {activityStatusRenderMap[activity.status].text}
                {activity.status === 'canceled' ? (
                  <>
                    ,{' '}
                    <Button className="p-0 sm:p-0 h-auto sm:h-auto bg-transparent typo-subtitle-md hover:bg-transparent text-alert hover:text-alert hover:underline">
                      request refund
                    </Button>
                  </>
                ) : null}
              </Typography>
            ) : null}
            {loading ? (
              <Skeleton className="h-1.5 w-10" />
            ) : (
              <Typography variant="subtitle-sm" className="text-gray-2">
                {activity ? formatDateTime(activity.createdAt) : ''}
              </Typography>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
