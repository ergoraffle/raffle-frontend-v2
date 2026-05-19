import { GetRaffle200ItemsItemStatus } from '@ergo-raffle/client';

export const raffleStatusMap: Record<
  GetRaffle200ItemsItemStatus,
  {
    variant: 'success' | 'error' | 'white-outline';
    label: string;
  }
> = {
  [GetRaffle200ItemsItemStatus.successful]: {
    variant: 'success',
    label: 'Successful'
  },
  [GetRaffle200ItemsItemStatus.failed]: {
    variant: 'error',
    label: 'Failed'
  },
  [GetRaffle200ItemsItemStatus.active]: {
    variant: 'white-outline',
    label: 'Active'
  }
};
