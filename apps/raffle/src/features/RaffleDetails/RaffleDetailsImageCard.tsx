import Image from 'next/image';

import { GetRaffle200ItemsItemStatus } from '@ergo-raffle/client';
import {
  AspectRatio,
  Badge,
  Card,
  CardAction,
  CardContent,
  CardImageWrapper,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Identifier,
  Skeleton,
  Typography
} from '@ergo-raffle/ui-kit';

import { getAddressUrl } from '@/lib';

import { raffleStatusMap } from '../raffleStatusRenderMap';
import type { RaffleDetailView } from './raffleToViewModel';

export type RaffleDetailsImageCardProps = {
  loading?: boolean;
  raffle?: RaffleDetailView;
};

export const RaffleDetailsImageCard = ({ loading, raffle }: RaffleDetailsImageCardProps) => (
  <Card className="w-full lg:w-125 order-2 lg:order-1 p-0 lg:min-h-130" border={false}>
    {loading ? (
      <CardImageWrapper loading={loading} />
    ) : !raffle?.pictures || !raffle?.pictures.length ? (
      <CardImageWrapper>
        <AspectRatio ratio={1.75 / 1}>
          <Image
            src="/illustrations/imagePlaceholderIllustration.svg"
            priority
            alt="Raffle"
            className="w-full object-contain rounded-tl-md rounded-tr-md"
            fill
            sizes="(max-width: 1024px) 100vw,33vw"
          />
        </AspectRatio>
      </CardImageWrapper>
    ) : (
      <Carousel>
        <CarouselContent>
          {raffle.pictures.map((picture) => (
            <CarouselItem key={picture}>
              <CardImageWrapper>
                <AspectRatio ratio={1.75 / 1}>
                  <Image
                    src={picture}
                    priority
                    alt={raffle.name}
                    className="w-full object-cover rounded-tl-md rounded-tr-md"
                    fill
                    sizes="(max-width: 1024px) 100vw,33vw"
                  />
                </AspectRatio>
              </CardImageWrapper>
            </CarouselItem>
          ))}
        </CarouselContent>
        {raffle.pictures.length > 1 ? (
          <>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselDots />
          </>
        ) : null}
      </Carousel>
    )}
    {!loading && raffle?.status && raffle?.status !== GetRaffle200ItemsItemStatus.active && (
      <CardAction>
        <Badge variant={raffleStatusMap[raffle.status]?.variant || 'white-outline'} size="sm">
          {raffleStatusMap[raffle.status]?.label || raffle?.status}
        </Badge>
      </CardAction>
    )}
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
                <span>{raffle?.missionFund || 0}%</span>
              </Typography>
            )}
          </div>
          <div className="flex items-center justify-between text-gray-1">
            <Typography variant="subtitle-lg" asChild>
              <span>Address:</span>
            </Typography>
            <div className="w-1/2">
              <Identifier
                value={raffle?.addresses.project}
                href={getAddressUrl(raffle?.addresses.project)}
                size="lg"
                loading={loading}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card border={false}>
        <CardContent className="flex flex-col">
          <div className="flex items-center justify-between text-black-1">
            <Typography variant="heading-5" asChild>
              <span>Winners Pot:</span>
            </Typography>
            {loading ? (
              <Skeleton className="h-2 w-10" />
            ) : (
              <Typography variant="heading-3" asChild>
                <span>{raffle?.winnerPotSharePercent || 0}%</span>
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
                <span>{raffle?.serviceFee || 0}%</span>
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </CardContent>
  </Card>
);
