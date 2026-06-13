import { notFound } from 'next/navigation';

import { ApiError, getInfoBlockchain, getRaffleRaffleId } from '@ergo-raffle/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
  WorkingOnIt
} from '@ergo-raffle/ui-kit';

import { RaiseProgress } from '@/features/RaiseProgress';

import { RaffleActivity } from './RaffleActivity';
import { RaffleDetailsDescription } from './RaffleDetailsDescription';
import { RaffleDetailsIconBox } from './RaffleDetailsIconBox';
import { RaffleDetailsImageCard } from './RaffleDetailsImageCard';
import { RaffleDonate } from './RaffleDonate';
import { RafflePinButton } from './RafflePinButton';
import { RaffleShareButton } from './RaffleShareButton';
import { RaffleWinnerBaskets } from './RaffleWinnerBaskets';
import { raffleToViewModel } from './raffleToViewModel';

export type RaffleDetailsProps = {
  raffleId: string;
};
export const RaffleDetails = async ({ raffleId }: RaffleDetailsProps) => {
  const infoBlockchainData = await getInfoBlockchain();

  const raffleServer = await getRaffleRaffleId(raffleId).catch((error) => {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  });

  const raffle = raffleToViewModel(raffleServer, infoBlockchainData);

  return (
    <div className="flex flex-col gap-9.5">
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-7 lg:gap-9.5">
        <RaffleDetailsImageCard raffle={raffle} />
        <div className="flex flex-col gap-5 grow order-1 lg:order-2">
          <div className="flex justify-between sm:items-center max-w-full">
            <Typography variant="heading-1" asChild>
              <h1>{raffle.name}</h1>
            </Typography>
            <div className="flex items-center gap-3.5">
              <RafflePinButton raffleId={raffleId} />
              <RaffleShareButton />
            </div>
          </div>
          <RaiseProgress amount={raffle.amount} token={raffle?.token} />
          <div className="hidden sm:block">
            <RaffleDetailsIconBox raffle={raffle} />
          </div>
          <RaffleDonate raffle={raffle} />
        </div>
        <div className="order-3 sm:hidden">
          <RaffleDetailsIconBox raffle={raffle} />
        </div>
      </div>
      <RaffleDetailsDescription raffle={raffle} />
      <RaffleWinnerBaskets raffle={raffle} />
      <div className="flex flex-col lg:flex-row gap-9.5">
        <Card className="flex-1 lg:flex-3 xl:flex-1" shadow>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Timeline of events</CardDescription>
          </CardHeader>
          <CardContent>
            <RaffleActivity raffleId={raffleId} />
          </CardContent>
        </Card>
        <Card className="flex-1 sm:flex-2 xl:flex-1 justify-stretch" shadow>
          <CardHeader>
            <CardTitle>Social Activity</CardTitle>
            <CardDescription>See related tweets on X</CardDescription>
          </CardHeader>
          <CardContent className="grow py-2 flex flex-col justify-center">
            <WorkingOnIt />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
