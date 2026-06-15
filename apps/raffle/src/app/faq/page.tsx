import Link from 'next/link';

import { Typography } from '@ergo-raffle/ui-kit';

import { Faqs } from '@/features/Faqs';

const FaqPage = () => (
  <div className="space-y-7">
    <div className="text-center space-y-2">
      <Typography variant="display-md">Frequently Asked Questions</Typography>
      <Typography variant="subtitle-xl">Find answers to common questions below.</Typography>
    </div>
    <Faqs />
    <Typography variant="body-lg" className="text-center">
      Can't find an answer? Contact us via{' '}
      <Link href="/" className="underline hover:text-secondary-1">
        Discord
      </Link>{' '}
      or{' '}
      <Link href="mailto:raffle@rosen.tech" className="underline hover:text-secondary-1">
        raffle@rosen.tech
      </Link>
    </Typography>
  </div>
);

export default FaqPage;
