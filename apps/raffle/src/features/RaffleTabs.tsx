import { Suspense } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ergo-raffle/ui-kit';

import { RaffleList } from './RaffleList';
import { RaffleListSkeleton } from './RaffleListSkeleton';

enum RAFFLE_TABS {
  ALL = 'All',
  ACTIVE = 'Active',
  HISTORY = 'History'
}

export const RaffleTabs = () => (
  <Tabs defaultValue={RAFFLE_TABS.ALL} className="mb-50 w-full">
    <TabsList variant="primary">
      <TabsTrigger key={RAFFLE_TABS.ALL} value={RAFFLE_TABS.ALL}>
        {RAFFLE_TABS.ALL}
      </TabsTrigger>
      <TabsTrigger key={RAFFLE_TABS.ACTIVE} value={RAFFLE_TABS.ACTIVE}>
        {RAFFLE_TABS.ACTIVE}
      </TabsTrigger>
      <TabsTrigger key={RAFFLE_TABS.HISTORY} value={RAFFLE_TABS.HISTORY}>
        {RAFFLE_TABS.HISTORY}
      </TabsTrigger>
    </TabsList>
    <TabsContent value={RAFFLE_TABS.ALL}>
      <Suspense fallback={<RaffleListSkeleton />}>
        <RaffleList limit={3} />
      </Suspense>
    </TabsContent>
    <TabsContent value={RAFFLE_TABS.ACTIVE}>
      <Suspense fallback={<RaffleListSkeleton />}>
        <RaffleList limit={3} params={{ status: ['active'] }} />
      </Suspense>
    </TabsContent>
    <TabsContent value={RAFFLE_TABS.HISTORY}>
      <Suspense fallback={<RaffleListSkeleton />}>
        <RaffleList limit={3} />
      </Suspense>
    </TabsContent>
  </Tabs>
);
