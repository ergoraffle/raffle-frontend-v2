import { RaffleSummaryStatus, type RaffleSummary } from '@ergo-raffle/client';
import { Ergo, GiftPlus, SandClock, Verified } from '@ergo-raffle/icons';
import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
  Skeleton,
  Typography
} from '@ergo-raffle/ui-kit';
import Image from 'next/image';

export type RafflesContentProps = {
  raffle?: RaffleSummary;
  loading?: boolean;
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

export const RaffleCard = ({ raffle, loading }: RafflesContentProps) => (
  <Card className="relative flex-1 max-w-1/3" padding="xs" hover>
    {loading ? (
      <Skeleton className="h-55.75 w-full rounded-none" />
    ) : (
      <div className="relative h-55.75 w-full bg-gray-3">
        {raffle?.image ? (
          <Image
            // src={raffle.image}
            src="/illustrations/hero-section-illustration.svg"
            alt={raffle.name}
            className="h-55.75 w-full object-cover rounded-tl-md rounded-tr-md"
            fill
          />
        ) : null}
      </div>
    )}
    <CardHeader>
      <CardTitle loading={loading}>{raffle?.name || 'One million coins'}</CardTitle>
    </CardHeader>
    {!loading && raffle?.status && raffle?.status !== RaffleSummaryStatus.active && (
      <CardAction>
        <Badge variant={raffleStatusMap[raffle.status]?.variant || 'white-outline'} size="sm">
          {raffleStatusMap[raffle.status]?.label || raffle?.status}
        </Badge>
      </CardAction>
    )}
    <CardContent className="flex flex-col gap-y-2 grow">
      <div className={`flex items-center gap-x-1 ${loading ? 'my-1' : ''}`}>
        {loading ? (
          <>
            <Badge loading />
            <Badge loading />
          </>
        ) : (
          <>
            <Badge variant="primary" size="sm">
              <Ergo />
              ERG
            </Badge>
            {raffle?.winnersCount ? (
              <Badge variant="outline" size="sm">
                {`${raffle?.winnersCount} Winner${raffle?.winnersCount > 1 ? 's' : ''}`}
              </Badge>
            ) : null}
            {raffle?.giftCount ? (
              <Badge variant="outline" size="sm">
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
      <div className="flex items-center gap-x-1 my-3">
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
      <Progress value={70} loading={loading} />
      {loading ? (
        <Skeleton className="w-2/5 h-4 mt-1" />
      ) : (
        <Typography variant="body-md" className="text-gray-2 flex items-center gap-x-1">
          <span className="text-black-1">57</span> ERG raised of{' '}
          <span className="text-black-1">100</span> ERG{' '}
          <Verified className="size-6 text-primary-1" />
        </Typography>
      )}
    </CardContent>
    <CardFooter>
      <Typography variant="subtitle-md" className="flex items-center gap-x-1">
        <SandClock className="size-4" />
        {loading ? <Skeleton className="w-24 h-3" /> : '20 Days remaining'}
      </Typography>
      <div className="flex items-center gap-1">
        <Typography variant="subtitle-md" className="text-gray-2">
          Trust: {loading ? null : <span className="text-success">4</span>}
        </Typography>
        {loading ? (
          <Skeleton className="w-14 h-1.5 rounded-sm" />
        ) : (
          <div className="h-1.5 w-14 rounded-sm relative bg-linear-to-r from-(--color-error) via-(--color-alert) to-(--color-success)">
            <span className="h-3 w-0.5 absolute -top-0.75 left-[80%] bg-(--color-gray-2)" />
          </div>
        )}
      </div>
    </CardFooter>
  </Card>
);
