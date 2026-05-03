export type DistributionBarProps = {
  winnerPot?: number;
  missionFund?: number;
  service: number;
};

export const DistributionBar = ({
  winnerPot = 0,
  missionFund = 0,
  service
}: DistributionBarProps) => (
  <div className="flex items-stretch h-7 sm:h-10.5 p-1 rounded-sm gap-1 bg-gray-4">
    <div className="rounded-sm bg-gray-3" style={{ width: `${service}%` }} />
    {!!winnerPot && <div className="rounded-sm bg-primary-2" style={{ width: `${winnerPot}%` }} />}
    {!!missionFund && (
      <div className="rounded-sm bg-white-1" style={{ width: `${missionFund}%` }} />
    )}
  </div>
);
