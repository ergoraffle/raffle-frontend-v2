import type { GetRaffle200ItemsItemToken } from '@ergo-raffle/client';
import { Info, Verified } from '@ergo-raffle/icons';
import { Progress, Skeleton, Tooltip, Typography } from '@ergo-raffle/ui-kit';

import { getDecimalString } from '@/lib';

export type RaisedAmounts = {
  current: string;
  target: string;
  isVerified: boolean;
};

export type RaiseProgressProps = {
  loading?: boolean;
  amount?: {
    raised: number;
    goal: number;
  };
  token?: GetRaffle200ItemsItemToken;
};

export const RaiseProgress = ({ loading, amount, token }: RaiseProgressProps) => (
  <div className="flex flex-col gap-y-1">
    <Progress value={amount?.raised || 0} max={amount?.goal || 100} loading={loading} />
    {loading ? (
      <Skeleton className="w-2/5 h-4 mt-1" />
    ) : (
      <div className="flex">
        <Tooltip
          disabled={token?.id.toLowerCase() === 'erg'}
          content={
            <div className="space-y-2">
              <Typography variant="subtitle-sm" className="text-gray-3">
                {token?.isVerified ? 'Verified token' : 'Unverified token'}
              </Typography>
              <Typography variant="subtitle-sm" className="text-gray-2">
                {token?.id}
              </Typography>
            </div>
          }
        >
          <Typography variant="body-md" className="text-gray-2 flex items-center gap-x-1">
            <span className="text-black-1">
              {getDecimalString(amount?.raised, token?.decimals)}
            </span>{' '}
            {token?.name || ''} {!token?.isVerified && <Info className="size-3.5 text-alert" />}{' '}
            raised of{' '}
            <span className="text-black-1">{getDecimalString(amount?.goal, token?.decimals)}</span>{' '}
            {!!token?.isVerified && <Verified className="size-5 text-primary-1" />}
          </Typography>
        </Tooltip>
      </div>
    )}
  </div>
);
