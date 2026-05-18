import type {
  GetActivity200ItemsItem,
  GetActivity200ItemsItemStatus,
  GetActivity200ItemsItemType
} from '@ergo-raffle/client';
import { Gift, Spark, Ticket } from '@ergo-raffle/icons';
import { BasketStatus } from '@ergo-raffle/ui-kit';

export const activityRenderMap: Record<
  GetActivity200ItemsItemType,
  {
    icon: React.ReactNode;
    shortText: (activity?: GetActivity200ItemsItem) => string;
    text: (activity?: GetActivity200ItemsItem) => string;
  }
> = {
  creation: {
    icon: <Spark className="size-6" />,
    shortText: () => 'Raffle created',
    text: () => 'Raffle created'
  },

  donation: {
    icon: <Ticket className="size-6" />,
    shortText: (activity?: GetActivity200ItemsItem) =>
      `${activity?.ticketCount ?? ''} Ticket bought`,
    text: (activity?: GetActivity200ItemsItem) => `${activity?.ticketCount ?? ''} Ticket bought`
  },
  gift: {
    icon: <Gift className="size-6" />,
    shortText: () => 'added gift',
    text: (activity?: GetActivity200ItemsItem) =>
      `added gift to “raising money for ${activity?.raffleName ?? ''}” Raffle`
  },
  gift_return: {
    icon: <Gift className="size-6" />,
    shortText: () => 'gift return',
    text: (activity?: GetActivity200ItemsItem) =>
      `added gift to “raising money for ${activity?.raffleName ?? ''}” Raffle`
  },
  ticket_redeem: {
    icon: <BasketStatus className="size-6" />,
    shortText: () => 'raising money',
    text: (activity?: GetActivity200ItemsItem) =>
      `“raising money for ${activity?.raffleName ?? ''}” Raffle`
  }
} as const;

export const activityStatusRenderMap: Record<
  GetActivity200ItemsItemStatus,
  {
    color: string;
    text: string;
  }
> = {
  success: {
    color: 'text-success',
    text: 'Successful'
  },

  pending: {
    color: 'text-gray-2',
    text: 'In progress'
  },

  failed: {
    color: 'text-alert',
    text: 'Took too long'
  }
} as const;
