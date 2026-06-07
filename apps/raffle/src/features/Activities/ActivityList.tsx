'use client';

import { useState } from 'react';

import type { GetActivity200ItemsItem } from '@ergo-raffle/client';

import { ActivityDetailsDialog } from './ActivityDetailsDialog';
import { ActivityItem } from './ActivityItem';

type ActivityProps = {
  activities: GetActivity200ItemsItem[];
};

export const ActivityList = ({ activities }: ActivityProps) => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  return (
    <>
      <div className="space-y-3">
        {activities.map((activity) => (
          <ActivityItem
            activity={activity}
            key={activity.txId}
            onClick={() => setDetailsDialogOpen(true)}
          />
        ))}
      </div>
      <ActivityDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={() => setDetailsDialogOpen(false)}
      />
    </>
  );
};
