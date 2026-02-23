import type { GetRafflesParams } from '@ergo-raffle/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ergo-raffle/ui-kit';

import { RaffleList } from '@/features';

enum RAFFLE_LIST_TABS {
  ALL = 'All',
  ACTIVE = 'Active',
  HISTORY = 'History',
  PINED = 'Pined'
}

type Props = {
  params?: GetRafflesParams;
};

export const RaffleListTabs = ({ params }: Props) => (
  <Tabs defaultValue={RAFFLE_LIST_TABS.ALL} className="mb-50 w-full">
    <TabsList>
      <TabsTrigger key={RAFFLE_LIST_TABS.ALL} value={RAFFLE_LIST_TABS.ALL}>
        {RAFFLE_LIST_TABS.ALL}
      </TabsTrigger>
      <TabsTrigger key={RAFFLE_LIST_TABS.ACTIVE} value={RAFFLE_LIST_TABS.ACTIVE}>
        {RAFFLE_LIST_TABS.ACTIVE}
      </TabsTrigger>
      <TabsTrigger key={RAFFLE_LIST_TABS.HISTORY} value={RAFFLE_LIST_TABS.HISTORY}>
        {RAFFLE_LIST_TABS.HISTORY}
      </TabsTrigger>
      <TabsTrigger key={RAFFLE_LIST_TABS.PINED} value={RAFFLE_LIST_TABS.PINED}>
        {RAFFLE_LIST_TABS.PINED}
      </TabsTrigger>
    </TabsList>
    <TabsContent value={RAFFLE_LIST_TABS.ALL}>
      <RaffleList params={params} />
    </TabsContent>
    <TabsContent value={RAFFLE_LIST_TABS.ACTIVE}>
      <RaffleList params={{ ...params, status: ['active'] }} />
    </TabsContent>
    <TabsContent value={RAFFLE_LIST_TABS.HISTORY}>
      <RaffleList params={params} />
    </TabsContent>
    <TabsContent value={RAFFLE_LIST_TABS.PINED}>
      <RaffleList params={params} />
    </TabsContent>
  </Tabs>
);
