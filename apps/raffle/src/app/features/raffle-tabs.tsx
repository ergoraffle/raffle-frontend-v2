import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ergo-raffle/ui-kit';
import { Suspense } from 'react';
import { RaffleList } from './raffle-list';
import { RaffleCard } from './raffle-card';

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
    <TabsContent value={RAFFLE_TABS.ALL} className="flex gap-8 w-full">
      <Suspense fallback={<RaffleCard loading />}>
        <RaffleList params={{ pageSize: 3 }} />
      </Suspense>
    </TabsContent>
    <TabsContent value={RAFFLE_TABS.ACTIVE}>
      <Suspense fallback={<RaffleCard loading />}>
        <RaffleList params={{ pageSize: 3, status: 'active' }} />
      </Suspense>
    </TabsContent>
    <TabsContent value={RAFFLE_TABS.HISTORY}>
      <Suspense fallback={<RaffleCard loading />}>
        <RaffleList params={{ pageSize: 3 }} />
      </Suspense>
    </TabsContent>
  </Tabs>
);
