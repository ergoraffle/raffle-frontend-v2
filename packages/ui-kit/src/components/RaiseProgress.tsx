import { Info } from '@ergo-raffle/icons';

import { Progress } from './Progress';
import { Skeleton } from './Skeleton';
import { Tooltip } from './Tooltip';
import { Typography } from './Typography';

export type RaiseProgressProps = {
  loading?: boolean;
  raisedAmounts?: {
    current: number;
    target: number;
    verified: boolean;
  };
  tokenName?: string;
};

export const RaiseProgress = ({ loading, raisedAmounts, tokenName }: RaiseProgressProps) => (
  <>
    <Progress
      value={raisedAmounts?.current ? raisedAmounts.current : 0}
      max={raisedAmounts?.target ? raisedAmounts.target : 100}
      loading={loading}
    />
    {loading ? (
      <Skeleton className="w-2/5 h-4 mt-1" />
    ) : (
      <Typography variant="body-md" className="text-gray-2 flex items-center gap-x-1">
        <span className="text-black-1">{raisedAmounts?.current}</span> {tokenName || ''}{' '}
        {!raisedAmounts?.verified && (
          <Tooltip content="Not verified">
            <Info className="size-3.5 text-alert" />
          </Tooltip>
        )}{' '}
        raised of <span className="text-black-1">{raisedAmounts?.target}</span>
      </Typography>
    )}
  </>
);
