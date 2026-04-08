import type { RaffleActivity } from '@ergo-raffle/client';
import { Downvote, Gift, Spark, Ticket, Upvote } from '@ergo-raffle/icons';
import { BasketStatus } from '@ergo-raffle/ui-kit';

export const activityRenderMap = {
  raffle_created: {
    icon: <Spark className="size-6" />,
    shortText: () => 'Raffle created',
    text: () => 'Raffle created'
  },

  ticket_bought: {
    icon: <Ticket className="size-6" />,
    shortText: (activity?: RaffleActivity) => `${activity?.amount ?? ''} Ticket bought`,
    text: (activity?: RaffleActivity) => `${activity?.amount ?? ''} Ticket bought`
  },

  upvoted: {
    icon: <Upvote className="size-6" />,
    shortText: () => 'Upvoted',
    text: () => 'Upvoted'
  },

  downvoted: {
    icon: <Downvote className="size-6" />,
    shortText: () => 'Downvoted',
    text: () => 'Downvoted'
  },

  gift_added: {
    icon: <Gift className="size-6" />,
    shortText: () => 'added gift',
    text: (activity?: RaffleActivity) =>
      `added gift to “raising money for ${activity?.raffleName ?? ''}” Raffle`
  },
  basket_won: {
    icon: <BasketStatus hasGift className="size-6" />,
    shortText: () => 'Won the Basket',
    text: (activity?: RaffleActivity) =>
      `Won the #${activity?.basketNumber ?? ''} Basket of “raising money for ${activity?.raffleName ?? ''}” Raffle`
  },
  raising_money: {
    icon: <BasketStatus className="size-6" />,
    shortText: () => 'raising money',
    text: (activity?: RaffleActivity) => `“raising money for ${activity?.raffleName ?? ''}” Raffle`
  }
} as const;

export const activityStatusRenderMap = {
  successful: {
    color: 'text-success',
    text: 'Successful'
  },

  pending: {
    color: 'text-gray-2',
    text: 'In progress'
  },

  canceled: {
    color: 'text-alert',
    text: 'Took too long'
  }
} as const;
