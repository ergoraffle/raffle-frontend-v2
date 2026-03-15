import { notFound } from 'next/navigation';

import { configureClient, getInfo, getRafflesRaffleId, withMock } from '@ergo-raffle/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  RaiseProgress,
  Typography
} from '@ergo-raffle/ui-kit';

import { RaffleActivity } from './RaffleActivity';
import { RaffleDetailsDescription } from './RaffleDetailsDescription';
import { RaffleDetailsIconBox } from './RaffleDetailsIconBox';
import { RaffleDetailsImageCard } from './RaffleDetailsImageCard';
import { RaffleDonate } from './RaffleDonate';
import { RafflePinButton } from './RafflePinButton';
import { RaffleShareButton } from './RaffleShareButton';
import { RaffleWinnerBaskets } from './RaffleWinnerBaskets';
import { getRaisedAmount } from './utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

configureClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || `https://${process.env.VERCEL_URL}/api`
});

export type RaffleDetailsProps = {
  raffleId: string;
};
export const RaffleDetails = async ({ raffleId }: RaffleDetailsProps) => {
  const raffle = await withMock(async () => await getRafflesRaffleId(raffleId));
  const infoData = await withMock(async () => await getInfo());

  if (!raffle) return notFound();

  const raisedAmounts = getRaisedAmount(raffle.soldTicketCount, raffle.ticketPrice, raffle.goal);

  return (
    <div className="flex flex-col gap-9.5">
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-7 lg:gap-9.5">
        <RaffleDetailsImageCard />
        <div className="flex flex-col gap-5 grow order-1 lg:order-2">
          <div className="flex justify-between sm:items-center max-w-full">
            <Typography variant="heading-1" asChild>
              <h1>{raffle.name}</h1>
            </Typography>
            <div className="flex items-center gap-3.5">
              <RafflePinButton initialPined={false} />
              <RaffleShareButton />
            </div>
          </div>
          <RaiseProgress raisedAmounts={raisedAmounts} tokenName={raffle?.collectingTokenName} />
          <div className="hidden sm:block">
            <RaffleDetailsIconBox
              lastBlockHeight={infoData.lastBlockHeight}
              soldTicketCount={raffle?.soldTicketCount}
            />
          </div>
          <RaffleDonate tokenName={raffle.collectingTokenName} />
        </div>
        <div className="order-3 sm:hidden">
          <RaffleDetailsIconBox
            lastBlockHeight={infoData.lastBlockHeight}
            soldTicketCount={raffle?.soldTicketCount}
          />
        </div>
      </div>
      <RaffleDetailsDescription description={raffle.description} />
      <RaffleWinnerBaskets raffleId={raffleId} />
      <div className="flex flex-col lg:flex-row gap-9.5">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Timeline of events</CardDescription>
          </CardHeader>
          <CardContent>
            <RaffleActivity raffleId={raffleId} />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Social Activity</CardTitle>
            <CardDescription>See related tweets on X</CardDescription>
          </CardHeader>
          <CardContent>...</CardContent>
        </Card>
      </div>
    </div>
  );
};
