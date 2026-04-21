import { Info } from '@ergo-raffle/icons';

import { getDecimalString } from '@/lib';

import { Progress } from './Progress';
import { Skeleton } from './Skeleton';
import { Tooltip } from './Tooltip';
import { Typography } from './Typography';

export type RaisedAmounts = {
  current: string;
  target: string;
  verified: boolean;
};

export type RaiseProgressProps = {
  loading?: boolean;
  amount?: {
    raised: number;
    goal: number;
  };
  token?: { id: string; name: string; decimals: number; verified: boolean };
};

export const RaiseProgress = ({ loading, amount, token }: RaiseProgressProps) => (
  <div className="flex flex-col gap-y-1">
    <Progress value={amount?.raised || 0} max={amount?.goal || 100} loading={loading} />
    {loading ? (
      <Skeleton className="w-2/5 h-4 mt-1" />
    ) : (
      <Typography variant="body-md" className="text-gray-2 flex items-center gap-x-1">
        <span className="text-black-1">{getDecimalString(amount?.raised, token?.decimals)}</span>{' '}
        {token?.name || ''}{' '}
        {!token?.verified && (
          <Tooltip content="Not verified">
            <Info className="size-3.5 text-alert" />
          </Tooltip>
        )}{' '}
        raised of{' '}
        <span className="text-black-1">{getDecimalString(amount?.goal, token?.decimals)}</span>
      </Typography>
    )}
  </div>
);
