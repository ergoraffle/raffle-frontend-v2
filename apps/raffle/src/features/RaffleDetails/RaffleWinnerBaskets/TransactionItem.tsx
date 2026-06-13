'use client';

import type { GetRaffleRaffleIdBasketWinnerIndexTransactions200ItemsItem } from '@ergo-raffle/client';
import { Identifier, Typography } from '@ergo-raffle/ui-kit';

import { basketTransactionRenderMap } from '@/features/basketTransactionRenderMap';
import { formatDateTime, getTxURL } from '@/lib';

export type TransactionItemProps = {
  transaction: GetRaffleRaffleIdBasketWinnerIndexTransactions200ItemsItem;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const config = basketTransactionRenderMap[transaction.type];
  return (
    <div className="flex items-center py-1.5 px-2 rounded-sm bg-white-1 justify-between gap-x-3.75 flex-wrap">
      <div className="flex-2 px-2 py-3 bg-secondary-5 text-secondary-1 rounded-sm text-center">
        {config?.text(transaction)}
      </div>
      <div className="max-w-25 text-secondary-1">
        <span className="block text-nowrap overflow-hidden text-ellipsis">
          {config?.direction} {transaction.address}
        </span>
      </div>
      <div className="max-w-42 hidden sm:block">
        <Identifier value={transaction.txId} href={getTxURL(transaction.txId)} size="lg" />
      </div>
      <Typography variant="subtitle-md" className="text-gray-2 text-right grow">
        {!!transaction.timestamp && formatDateTime(transaction.timestamp * 1000)}
      </Typography>
    </div>
  );
};
