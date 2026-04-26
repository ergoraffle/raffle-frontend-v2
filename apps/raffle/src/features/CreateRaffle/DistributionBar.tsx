type DistributionBarProps = {
  winnerPot?: number;
  missionFund?: number;
  service: number;
};

export const DistributionBar = ({
  winnerPot = 0,
  missionFund = 0,
  service
}: DistributionBarProps) => (
  <div className="flex items-stretch h-7 sm:h-10.5 gap-1">
    <div className="rounded-sm bg-gray-3" style={{ width: `${service}%` }} />
    {!!missionFund && (
      <div className="rounded-sm bg-primary-2" style={{ width: `${missionFund}%` }} />
    )}
    {!!winnerPot && (
      <div className="rounded-sm border border-gray-1" style={{ width: `${winnerPot}%` }} />
    )}
  </div>
);
