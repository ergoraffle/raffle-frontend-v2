'use client';

import type { BasketTransaction } from '@ergo-raffle/client';
import { Identifier, Typography } from '@ergo-raffle/ui-kit';

import { formatDateTime } from '@/lib/utils';

export type TransactionItemProps = {
  transaction: BasketTransaction;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => (
  <div className="flex items-center py-1.5 px-2 rounded-sm bg-white-1 justify-between gap-x-3.75">
    <div className="flex-2 px-2 py-3 bg-secondary-5 text-secondary-5-foreground rounded-sm">
      {transaction.type === 'asset_unwrap'
        ? `${transaction.amount} Asset Unwrap`
        : `Ticket ${transaction.amount} won`}
    </div>
    <div className="max-w-25 text-secondary-1">
      <span className="block text-nowrap overflow-hidden text-ellipsis">
        {transaction.type === 'asset_unwrap' ? `to` : `by`} {transaction.wallet}
      </span>
    </div>
    <div className="max-w-42">
      <Identifier value={transaction.address} href={transaction.address} />
    </div>
    <Typography variant="subtitle-md" className="text-gray-2 text-right grow">
      {transaction.createdAt ? formatDateTime(transaction.createdAt) : null}
    </Typography>
  </div>
);
