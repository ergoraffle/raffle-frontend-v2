import Image from 'next/image';
import Link from 'next/link';

import { type RaffleSummary, RaffleSummaryStatus } from '@ergo-raffle/client';
import { GiftPlus, SandClock } from '@ergo-raffle/icons';
import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardImageWrapper,
  CardTitle,
  RaiseProgress,
  Skeleton,
  Token,
  Typography
} from '@ergo-raffle/ui-kit';

import { raffleStatusMap } from './raffleStatusRenderMap';
import { getDeadlineString } from './utils';

export type RafflesContentProps = {
  raffle?: RaffleSummary;
  loading?: boolean;
  deadline?: number;
};

export const RaffleCard = ({ raffle, deadline, loading }: RafflesContentProps) => (
  <Link
    href={`/raffles/${raffle?.id}`}
    className={`flex items-stretch grow ${loading ? 'pointer-events-none' : ''}`}
  >
    <Card className="relative grow w-full" hover>
      <CardImageWrapper loading={loading}>
        {raffle?.picture ? (
          <Image
            src={raffle.picture}
            priority
            alt={raffle.name}
            className="h-55.75 w-full object-cover rounded-tl-md rounded-tr-md"
            fill
          />
        ) : null}
      </CardImageWrapper>
      <CardHeader>
        <CardTitle loading={loading} className="line-clamp-2">
          {raffle?.name}
        </CardTitle>
      </CardHeader>
      {!loading && raffle?.status && raffle?.status !== RaffleSummaryStatus.active && (
        <CardAction>
          <Badge variant={raffleStatusMap[raffle.status]?.variant || 'white-outline'} size="sm">
            {raffleStatusMap[raffle.status]?.label || raffle?.status}
          </Badge>
        </CardAction>
      )}
      <CardContent className="flex flex-col gap-y-2 grow">
        <div className={`flex items-center gap-x-1 gap-y-1.5 flex-wrap ${loading ? 'my-1' : ''}`}>
          {loading ? (
            <>
              <Badge loading />
              <Badge loading />
            </>
          ) : (
            <>
              {raffle?.token ? (
                <Badge variant="primary">
                  <Token name={raffle?.token.name} tokenId={raffle?.token.id} />
                </Badge>
              ) : null}
              {raffle?.winnersCount ? (
                <Badge variant="outline">
                  {`${raffle?.winnersCount} Winner${raffle?.winnersCount > 1 ? 's' : ''}`}
                </Badge>
              ) : null}
              {raffle?.giftCount ? (
                <Badge variant="outline">
                  <GiftPlus />
                  {raffle?.giftCount}
                </Badge>
              ) : null}
            </>
          )}
        </div>
        <div className="grow flex flex-col gap-y-2">
          {loading ? (
            <>
              <Skeleton className="w-full h-3 mb-1" />
              <Skeleton className="w-full h-3 mb-1" />
              <Skeleton className="w-full h-3 mb-1" />
              <Skeleton className="w-1/2 h-3 mb-1" />
            </>
          ) : (
            <div
              className="line-clamp-3 overflow-hidden **:[all:unset] [&_ *]:!text-inherit"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: temporary bypass
              dangerouslySetInnerHTML={{ __html: raffle?.description || '' }}
            />
          )}
        </div>
        <div className="flex items-center gap-x-1 gap-y-1.5 my-3 flex-wrap">
          {loading ? (
            <>
              <Badge loading />
              <Badge loading />
              <Badge loading />
            </>
          ) : (
            raffle?.tags?.map((tag) => (
              <Badge variant="secondary" size="sm" key={tag}>
                {tag}
              </Badge>
            ))
          )}
        </div>
        <RaiseProgress amount={raffle?.amount} token={raffle?.token} loading={loading} />
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-x-1">
          <SandClock className="size-4" />
          {loading ? (
            <Skeleton className="w-24 h-3" />
          ) : deadline ? (
            <Typography variant="subtitle-md">{getDeadlineString(deadline)}</Typography>
          ) : (
            ''
          )}
        </div>
      </CardFooter>
    </Card>
  </Link>
);
