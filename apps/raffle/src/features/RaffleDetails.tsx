import { notFound } from 'next/navigation';

import { configureClient, getInfo, getRafflesRaffleId, withMock } from '@ergo-raffle/client';
import { Pin, Share } from '@ergo-raffle/icons';
import {
  Button,
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
      <div className="flex flex-col lg:flex-row gap-9.5">
        <RaffleDetailsImageCard />
        <div className="flex flex-col gap-5 grow order-1 lg:order-21">
          <div className="flex justify-between items-center">
            <Typography variant="heading-1">{raffle.name}</Typography>
            <div className="flex items-center gap-3.5">
              <Button variant="rounded" size="icon">
                <Pin />
              </Button>
              <Button variant="rounded" size="icon">
                <Share />
              </Button>
            </div>
          </div>
          <RaiseProgress raisedAmounts={raisedAmounts} tokenName={raffle?.collectingTokenName} />
          <RaffleDetailsIconBox
            lastBlockHeight={infoData.lastBlockHeight}
            soldTicketCount={raffle?.soldTicketCount}
          />
          <RaffleDonate tokenName={raffle.collectingTokenName} />
        </div>
      </div>
      <RaffleDetailsDescription description={raffle.description} />
      <Card>
        <CardHeader>
          <CardTitle>Winner Baskets</CardTitle>
        </CardHeader>
        <CardContent>
          <RaffleWinnerBaskets raffleId={raffleId} />
        </CardContent>
      </Card>
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
