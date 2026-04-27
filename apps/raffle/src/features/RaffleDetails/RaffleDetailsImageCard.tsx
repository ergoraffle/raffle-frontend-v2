import Image from 'next/image';

import { type RaffleDetailResponse, RaffleSummaryStatus } from '@ergo-raffle/client';
import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardImageWrapper,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  Identifier,
  Skeleton,
  Typography
} from '@ergo-raffle/ui-kit';

import { raffleStatusMap } from '../raffleStatusRenderMap';

export type RaffleDetailsImageCardProps = {
  loading?: boolean;
  serviceFee?: number;
  winnerPot?: number;
  missionFund?: number;
  raffle?: Pick<RaffleDetailResponse, 'pictures' | 'name' | 'addresses' | 'status'>;
};

export const RaffleDetailsImageCard = ({
  loading,
  serviceFee,
  winnerPot,
  missionFund,
  raffle
}: RaffleDetailsImageCardProps) => (
  <Card className="w-full lg:w-125 order-2 lg:order-1 p-0 lg:min-h-130" border={false}>
    {loading || !raffle?.pictures || !raffle?.pictures.length ? (
      <CardImageWrapper loading={loading} className="sm:h-81" />
    ) : (
      <Carousel>
        <CarouselContent>
          {raffle.pictures.map((picture) => (
            <CarouselItem key={picture}>
              <CardImageWrapper className="sm:h-81">
                <Image
                  src={picture}
                  priority
                  alt={raffle.name}
                  className="h-81 w-full object-cover rounded-tl-md rounded-tr-md"
                  fill
                />
              </CardImageWrapper>
            </CarouselItem>
          ))}
        </CarouselContent>
        {raffle?.pictures && raffle.pictures.length > 1 ? <CarouselDots /> : null}
      </Carousel>
    )}
    {!loading && raffle?.status && raffle?.status !== RaffleSummaryStatus.active && (
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
                <span>{missionFund || 0}%</span>
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
                href={raffle?.addresses.project}
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
                <span>{winnerPot || 0}%</span>
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
                <span>{serviceFee || 0}%</span>
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </CardContent>
  </Card>
);
