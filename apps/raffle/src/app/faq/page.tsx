import Link from 'next/link';

import { Typography } from '@ergo-raffle/ui-kit';

import { FAQs } from '@/features/FAQs';

const FAQPage = () => (
  <div className="space-y-7">
    <div className="text-center space-y-2">
      <Typography variant="display-md">Frequently Asked Questions</Typography>
      <Typography variant="subtitle-xl">Find answers to common questions below.</Typography>
    </div>
    <FAQs />
    <Typography variant="body-lg" className="text-center">
      Can't find an answer? Contact us via{' '}
      <Link href="/" className="underline hover:text-secondary-1">
        Discord
      </Link>{' '}
      or{' '}
      <Link href="email:email@gmail.com" className="underline hover:text-secondary-1">
        email@gmail.com
      </Link>
    </Typography>
  </div>
);

export default FAQPage;
