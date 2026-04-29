import { RaffleSummaryStatus } from '@ergo-raffle/client';

export const raffleStatusMap: Record<
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
