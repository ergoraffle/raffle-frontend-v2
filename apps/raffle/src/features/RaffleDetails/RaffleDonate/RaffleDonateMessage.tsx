import Link from 'next/link';

import { Identifier, Typography } from '@ergo-raffle/ui-kit';

import { useWalletAddress } from '@/hooks';
import { getTxURL } from '@/lib';

export type RaffleDonateMessageProps = {
  transactionId: string;
};

export const RaffleDonateMessage = ({ transactionId }: RaffleDonateMessageProps) => {
  const walletAddress = useWalletAddress();
  const activityLink = walletAddress ? `/activity/${walletAddress}` : undefined;

  return (
    <div className="flex flex-col space-y-1 justify-center items-center w-full my-2.5">
      <Typography variant="heading-3" className="mb-3">
        Thanks for Contributing
      </Typography>
      <Typography variant="body-md">Transaction Id:</Typography>
      <Identifier
        value={transactionId}
        href={getTxURL(transactionId)}
        size="lg"
        className="w-80 max-w-full"
      />
      {!!activityLink && (
        <Typography variant="body-md">
          Follow up in{' '}
          <Link href={activityLink} className="underline hover:text-secondary-1">
            my activities
          </Link>
        </Typography>
      )}
    </div>
  );
};
