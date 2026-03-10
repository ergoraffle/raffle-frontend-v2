import Image from 'next/image';
import { notFound } from 'next/navigation';

import { configureClient, getInfo, getRafflesRaffleId, withMock } from '@ergo-raffle/client';
import { HandCoin, Pin, SandClock, Share, Ticket } from '@ergo-raffle/icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImageWrapper,
  CardTitle,
  Identifier,
  RaiseProgress,
  TrustBar,
  Typography
} from '@ergo-raffle/ui-kit';

import { RaffleDonate } from './RaffleDonate';
import { RaffleVote } from './RaffleVote';
import { RaffleWinnerBaskets } from './RaffleWinnerBaskets';
import { RaffleActivity } from './RaffleActivity';

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

  //Q
  const raisedAmounts = {
    target: raffle.soldTicketCount * raffle.ticketPrice,
    current: raffle.goal,
    verified: true
  };
  const deadline = infoData.lastBlockHeight - 1416515375925;
  const trust = { value: 0, max: 100 };

  return (
    <div className="flex flex-col gap-9.5">
      <div className="flex flex-col lg:flex-row gap-9.5">
        <Card className="w-full lg:w-125 order-2 lg:order-1">
          <CardImageWrapper>
            {raffle?.image ? (
              <Image
                // src={raffle.image}
                src="/sample.png"
                priority
                alt={raffle.name}
                className="h-81 w-full object-cover rounded-tl-md rounded-tr-md"
                fill
              />
            ) : null}
          </CardImageWrapper>
          <CardContent className="flex flex-col gap-1.5 px-0 ">
            <Card padding="xs" border={false}>
              <CardContent className="flex flex-col">
                <div className="flex items-center justify-between text-black-1">
                  <Typography variant="heading-5" asChild>
                    <span>Mission fund:</span>
                  </Typography>
                  <Typography variant="heading-3" asChild>
                    <span>95%</span>
                  </Typography>
                </div>
                <div className="flex items-center justify-between text-gray-1">
                  <Typography variant="subtitle-lg" asChild>
                    <span>Address:</span>
                  </Typography>
                  <div className="max-w-1/2">
                    <Identifier
                      value="9hLCPF5AYn1RukPPr8X1RukPPr8X1RukPPr8X1RukPPr8X1RukPPr8X"
                      href="#"
                      size="lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card padding="xs" border={false}>
              <CardContent className="flex flex-col">
                <div className="flex items-center justify-between text-black-1">
                  <Typography variant="heading-5" asChild>
                    <span>Winners Pot:</span>
                  </Typography>
                  <Typography variant="heading-3" asChild>
                    <span>0</span>
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Card padding="xs" border={false}>
              <CardContent className="flex flex-col">
                <div className="flex items-center justify-between text-black-1">
                  <Typography variant="heading-5" asChild>
                    <span>Service fee</span>
                  </Typography>
                  <Typography variant="heading-3" asChild>
                    <span>50%</span>
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Card padding="xs" border={false}>
              <CardContent className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-between">
                  <Typography variant="heading-5">Credibility:</Typography>
                  <Typography variant="subtitle-lg" className="text-gray-1" asChild>
                    <span>No votes yet</span>
                  </Typography>
                </div>
                <div className="flex items-center justify-end gap-4 text-gray-1 w-20">
                  <TrustBar value={trust?.value} max={trust?.max} />
                  <RaffleVote raffleId={raffle.raffleId} raffleTitle={raffle.name} />
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
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
          <Card padding="lg">
            <CardContent className="flex items-center justify-between py-2 px-5.5">
              <div className="flex flex-col items-center justify-center gap-1">
                <SandClock className="size-13" />
                <Typography variant="subtitle-lg">
                  {deadline > 0
                    ? `${Math.floor(deadline / (1000 * 60 * 60 * 24))} Days remaining`
                    : `Ended ${Math.floor(Math.abs(deadline) / (1000 * 60 * 60 * 24))} Days ago`}
                </Typography>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Ticket className="size-13" />
                <Typography variant="subtitle-lg">
                  {raffle.soldTicketCount} Ticket Bought
                </Typography>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <HandCoin className="size-13" />
                {/* Static */}
                <Typography variant="subtitle-lg">0 Backer</Typography>
              </div>
            </CardContent>
          </Card>
          <RaffleDonate tokenName={raffle.collectingTokenName} />
          <div className="relative h-48.5 w-full">
            <Image
              src="/illustrations/raffleDonateIllustration.svg"
              alt="Donate"
              className="object-contain"
              fill
            />
          </div>
        </div>
      </div>
      {raffle.description ? (
        <Card shadow>
          <CardHeader>
            <CardTitle>Description:</CardTitle>
            <CardDescription>A very short Description.</CardDescription>
          </CardHeader>
          <CardContent>{raffle.description}</CardContent>
        </Card>
      ) : null}
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
            <RaffleActivity />
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
