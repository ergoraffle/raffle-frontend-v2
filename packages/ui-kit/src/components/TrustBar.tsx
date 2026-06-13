import { Skeleton } from './Skeleton';
import { Typography } from './Typography';

export type RaffleTrustBarProps = {
  loading?: boolean;
  value?: number;
  max?: number;
};

export const TrustBar = ({ loading, value = 0, max = 100 }: RaffleTrustBarProps) => {
  const percentage = (value / max) * 100;

  const status = () => {
    if (percentage <= 30) {
      return 'error';
    }
    if (percentage > 30 && percentage < 70) {
      return 'alert';
    }
    return 'success';
  };

  return loading ? (
    <Skeleton className="w-14 h-1.5 rounded-sm" />
  ) : (
    <div className="flex items-center gap-1">
      {value ? (
        <Typography variant="subtitle-md" className={`text-${status()}`}>
          {value}
        </Typography>
      ) : null}
      <div
        className={`h-1.5 w-14 rounded-sm relative ${value ? 'bg-linear-to-r from-error via-alert to-success' : 'bg-gray-5'}`}
      >
        <span
          className={`h-3 w-0.5 absolute -top-0.75 bg-gray-2`}
          style={{ left: `calc(${value ? percentage : 50}% - 1px)` }}
        />
      </div>
    </div>
  );
};
