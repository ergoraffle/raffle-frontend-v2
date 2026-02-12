import { getGetRafflesQueryOptions } from '@ergo-raffle/client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Hero } from './components/Hero';
import { RaffleTabs } from './features/raffle-tabs';
import { createQueryClient } from '@/lib/ssr-query-client';

const Home = async () => {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery(getGetRafflesQueryOptions({ pageSize: 3, page: 1 }));
  const dehydratedState = dehydrate(queryClient);
  console.log(dehydratedState);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Hero />
      <RaffleTabs />
    </HydrationBoundary>
  );
};

export default Home;
