import type { RaffleActivity } from '@ergo-raffle/client';
import { Downvote, Gift, Spark, Ticket, Upvote } from '@ergo-raffle/icons';
import { Card, CardContent, Identifier, Skeleton, Typography } from '@ergo-raffle/ui-kit';

import { formatDateTime } from '@/lib/utils';

export const activityRenderMap = {
  raffle_created: {
    icon: Spark,
    text: () => 'Raffle created'
  },

  ticket_bought: {
    icon: Ticket,
    text: (count?: number) => `${count ?? ''} Ticket bought`
  },

  upvoted: {
    icon: Upvote,
    text: () => 'Upvoted'
  },

  downvoted: {
    icon: Downvote,
    text: () => 'Downvoted'
  },

  gift_added: {
    icon: Gift,
    text: () => 'Gift added'
  }
} as const;

export type RaffleActivityItemProps = { activity?: RaffleActivity; loading?: boolean };

export const RaffleActivityItem = ({ activity, loading }: RaffleActivityItemProps) => {
  const config = activity ? activityRenderMap[activity.type] : undefined;
  const Icon = config?.icon;

  return (
    <div className="flex items-stretch space-x-2">
      <Card padding="xs" className="flex-2">
        <CardContent className="flex items-center space-x-1  my-auto">
          {loading ? (
            <>
              <Skeleton className="size-6" />
              <Skeleton className="w-20 h-3" />
            </>
          ) : (
            <>
              <Icon className="size-6" />
              <Typography variant="body-md">
                {config?.text(activity?.amount ?? undefined)}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <Card padding="xs" className="grow">
        <CardContent className="flex items-center justify-between space-x-1 text-gray-2 my-auto">
          <div className="max-w-70">
            {loading ? (
              <Skeleton className="h-2 w-70" />
            ) : (
              <Identifier size="lg" value={activity?.wallet} />
            )}
          </div>
          {loading ? (
            <Skeleton className="h-1.5 w-10" />
          ) : (
            <Typography variant="subtitle-sm">
              {activity ? formatDateTime(activity.createdAt) : ''}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
