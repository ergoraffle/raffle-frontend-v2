import { RaffleCard } from './RaffleCard';

export type RaffleListSkeletonProps = {
  count?: number;
};

export const RaffleListSkeleton = ({ count = 3 }: RaffleListSkeletonProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 w-full">
    {Array.from({ length: count }).map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: cards are static, order won't change
      <RaffleCard loading key={index} />
    ))}
  </div>
);
