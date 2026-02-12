import { Button, Typography } from '@ergo-raffle/ui-kit';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => (
  <div className="h-[calc(100vh-90px)] flex items-stretch gap-x-12 justify-stretch">
    <div className="flex flex-col justify-center">
      <Typography variant="display-md" className="text-black-1 mb-3">
        Incentivized Crowdfunding
      </Typography>
      <Typography variant="heading-2">Powered by Ergo, Beyond ERG!</Typography>
      <div className="mt-12 md:w-64">
        <Button variant="primary" className="mt-4 w-full" size="lg" asChild>
          <Link href="/raffles">Explore Raffles</Link>
        </Button>
        <Button variant="outline" className="mt-4 w-full" size="lg" asChild>
          <Link href="/create-raffle">Create Raffle</Link>
        </Button>
      </div>
    </div>
    <div className="grow min-w-1/2 relative">
      <Image
        src="/illustrations/hero-section-illustration.svg"
        alt="Raffle"
        fill
        className="object-contain"
      />
    </div>
  </div>
);
