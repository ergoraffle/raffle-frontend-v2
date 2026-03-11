import Image from 'next/image';

import type { RaffleDetailResponse } from '@ergo-raffle/client';
import {
  Card,
  CardContent,
  CardImageWrapper,
  Identifier,
  Skeleton,
  TrustBar,
  Typography
} from '@ergo-raffle/ui-kit';

import { RaffleVote } from './RaffleVote';

export type RaffleDetailsImageCardProps = {
  loading?: boolean;
  raffle?: Pick<RaffleDetailResponse, 'raffleId' | 'image' | 'name'>;
};

export const RaffleDetailsImageCard = ({ loading, raffle }: RaffleDetailsImageCardProps) => {
  const trust = { value: 0, max: 100 };
  return (
    <Card className="w-full lg:w-125 order-2 lg:order-1 p-0" border={false}>
      <CardImageWrapper loading={loading}>
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
      <CardContent className="flex flex-col gap-1.5 p-0 justify-stretch grow">
        <Card border={false}>
          <CardContent className="flex flex-col">
            <div className="flex items-center justify-between text-black-1">
              <Typography variant="heading-5" asChild>
                <span>Mission fund:</span>
              </Typography>
              {loading ? (
                <Skeleton className="h-2 w-10" />
              ) : (
                <Typography variant="heading-3" asChild>
                  <span>95%</span>
                </Typography>
              )}
            </div>
            <div className="flex items-center justify-between text-gray-1">
              <Typography variant="subtitle-lg" asChild>
                <span>Address:</span>
              </Typography>
              <div className="w-1/2">
                <Identifier
                  value="9hLCPF5AYn1RukPPr8X1RukPPr8X1RukPPr8X1RukPPr8X1RukPPr8X"
                  href="#"
                  size="lg"
                  loading={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card border={false} className="grow">
          <CardContent className="flex flex-col">
            <div className="flex items-center justify-between text-black-1">
              <Typography variant="heading-5" asChild>
                <span>Winners Pot:</span>
              </Typography>
              {loading ? (
                <Skeleton className="h-2 w-10" />
              ) : (
                <Typography variant="heading-3" asChild>
                  <span>0</span>
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>
        <Card border={false}>
          <CardContent className="flex flex-col">
            <div className="flex items-center justify-between text-black-1">
              <Typography variant="heading-5" asChild>
                <span>Service fee</span>
              </Typography>
              {loading ? (
                <Skeleton className="h-2 w-10" />
              ) : (
                <Typography variant="heading-3" asChild>
                  <span>50%</span>
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>
        <Card border={false}>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-col">
              <Typography variant="heading-5">Credibility:</Typography>
              {loading ? (
                <Skeleton className="h-1.5 w-16 my-2" />
              ) : (
                <Typography variant="subtitle-lg" className="text-gray-1" asChild>
                  <span>No votes yet</span>
                </Typography>
              )}
            </div>
            <div className="flex items-center justify-end gap-4 text-gray-1 w-20">
              <TrustBar value={trust?.value} max={trust?.max} loading={loading} />
              {loading ? (
                <Skeleton className="size-7" />
              ) : raffle ? (
                <RaffleVote raffleId={raffle.raffleId} raffleTitle={raffle.name} />
              ) : null}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
