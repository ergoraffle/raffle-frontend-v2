import { Card, CardContent, Skeleton, TrustBar, Typography } from '@ergo-raffle/ui-kit';

import { RaffleVote } from './RaffleVote';

export type VoteCardProps = {
  loading?: boolean;
  raffle?: { id: string; name: string };
  voteCount?: number;
};

export const VoteCard = ({ loading, raffle, voteCount }: VoteCardProps) => (
  <Card border={false}>
    <CardContent className="flex items-center justify-between">
      <div className="flex flex-col">
        <Typography variant="heading-5">Credibility:</Typography>
        {loading ? (
          <Skeleton className="h-1.5 w-16 my-2" />
        ) : (
          <Typography variant="subtitle-lg" className="text-gray-1" asChild>
            <span>
              {voteCount ? `${voteCount} vote${voteCount > 1 ? 's' : ''}` : 'No votes yet'}
            </span>
          </Typography>
        )}
      </div>
      <div className="flex items-center justify-end gap-4 text-gray-1 w-20">
        <TrustBar loading={loading} />
        {loading ? (
          <Skeleton className="size-7" />
        ) : (
          !!raffle && <RaffleVote raffleTitle={raffle.name} raffleId={raffle.id} />
        )}
      </div>
    </CardContent>
  </Card>
);
