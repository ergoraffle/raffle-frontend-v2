import { RaffleSummaryStatus, type RaffleSummary } from '@ergo-raffle/client';
import { GiftPlus, SandClock, Verified } from '@ergo-raffle/icons';
import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardImageWrapper,
  CardTitle,
  Progress,
  Skeleton,
  Token,
  TrustBar,
  Typography
} from '@ergo-raffle/ui-kit';
import Image from 'next/image';
import Link from 'next/link';

export type RafflesContentProps = {
  raffle?: RaffleSummary;
  loading?: boolean;
  deadline?: string;
  raisedAmounts?: {
    current: number;
    target: number;
    verified: boolean;
  };
  trust?: { value: number; max: number };
};

const raffleStatusMap: Record<
  RaffleSummaryStatus,
  {
    variant: 'success' | 'error' | 'white-outline';
    label: string;
  }
> = {
  [RaffleSummaryStatus.successful]: {
    variant: 'success',
    label: 'Successful'
  },
  [RaffleSummaryStatus.failed]: {
    variant: 'error',
    label: 'Failed'
  },
  [RaffleSummaryStatus.active]: {
    variant: 'white-outline',
    label: 'Active'
  }
};

export const RaffleCard = ({
  raffle,
  raisedAmounts,
  deadline,
  trust,
  loading
}: RafflesContentProps) => (
  <Link href={`/raffles/${raffle?.raffleId}`} className="flex items-stretch grow">
    <Card className="relative grow w-full" hover>
      <CardImageWrapper loading={loading}>
        {raffle?.image ? (
          <Image
            // src={raffle.image}
            src="/sample.png"
            alt={raffle.name}
            className="h-55.75 w-full object-cover rounded-tl-md rounded-tr-md"
            fill
          />
        ) : null}
      </CardImageWrapper>
      <CardHeader>
        <CardTitle loading={loading}>{raffle?.name}</CardTitle>
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
              {raffle?.collectingTokenId ? (
                <Badge variant="primary">
                  {/* <Token name={raffle?.collectingTokenName} tokenId={raffle?.collectingTokenId} /> */}
                  <Token name="Erg" />
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
            <Typography variant="body-sm" className="text-black-2">
              {raffle?.description || ''}
            </Typography>
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
        <Progress
          value={raisedAmounts?.current ? raisedAmounts.current : 0}
          max={raisedAmounts?.target ? raisedAmounts.target : 100}
          loading={loading}
        />
        {loading ? (
          <Skeleton className="w-2/5 h-4 mt-1" />
        ) : (
          <Typography variant="body-md" className="text-gray-2 flex items-center gap-x-1">
            <span className="text-black-1">{raisedAmounts?.current}</span> ERG raised of{' '}
            <span className="text-black-1">{raisedAmounts?.target}</span> ERG{' '}
            {raisedAmounts?.verified ? <Verified className="size-6 text-primary-1" /> : null}
          </Typography>
        )}
      </CardContent>
      <CardFooter>
        <Typography variant="subtitle-md" className="flex items-center gap-x-1">
          <SandClock className="size-4" />
          {loading ? <Skeleton className="w-24 h-3" /> : (deadline ?? '')}
        </Typography>
        <TrustBar value={trust?.value} max={trust?.max} loading={loading} />
      </CardFooter>
    </Card>
  </Link>
);
