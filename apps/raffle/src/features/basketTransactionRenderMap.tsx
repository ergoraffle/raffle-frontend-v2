import type {
  GetRaffleRaffleIdBasketWinnerIndexTransactions200ItemsItem,
  GetRaffleRaffleIdBasketWinnerIndexTransactions200ItemsItemType
} from '@ergo-raffle/client';

export const basketTransactionRenderMap: Record<
  GetRaffleRaffleIdBasketWinnerIndexTransactions200ItemsItemType,
  {
    direction: string;
    text: (transaction?: GetRaffleRaffleIdBasketWinnerIndexTransactions200ItemsItem) => string;
  }
> = {
  creation: {
    direction: 'by',
    text: () => 'Raffle created'
  },

  donation: {
    direction: 'by',
    text: (transaction?: GetRaffleRaffleIdBasketWinnerIndexTransactions200ItemsItem) =>
      `${transaction?.ticketCount ?? ''} Ticket bought`
  },
  gift: {
    direction: 'by',
    text: () => `Added gift`
  },
  gift_return: {
    direction: 'to',
    text: () => `Gift returned`
  },
  ticket_redeem: {
    direction: 'to',
    text: (transaction?: GetRaffleRaffleIdBasketWinnerIndexTransactions200ItemsItem) =>
      `Ticket ${transaction?.ticketCount ?? ''} won`
  }
} as const;
