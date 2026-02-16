import { RaffleCard } from './raffle-card';

export type RaffleListSkeletonProps = {
  count?: number;
};

export const RaffleListSkeleton = ({ count = 3 }: RaffleListSkeletonProps) =>
  Array.from({ length: count }).map((_) => <RaffleCard loading key={crypto.randomUUID()} />);
