import { Skeleton } from './Skeleton';
import { Typography } from './Typography';

export type RaffleTrustBarProps = {
  loading?: boolean;
  value?: number;
  max?: number;
};

export const TrustBar = ({ loading, value = 0, max = 100 }: RaffleTrustBarProps) => (
  <div className="flex items-center gap-1">
    <Typography variant="subtitle-md" className="text-gray-2">
      Trust: {loading ? null : <span className="text-success">{value}</span>}
    </Typography>
    {loading ? (
      <Skeleton className="w-14 h-1.5 rounded-sm" />
    ) : (
      <div className="h-1.5 w-14 rounded-sm relative bg-linear-to-r from-error via-alert to-success">
        <span
          className={`h-3 w-0.5 absolute -top-0.75 left-[${(value / max) * 100 - 1}%] bg-gray-2`}
        />
      </div>
    )}
  </div>
);
