import Image from 'next/image';
import Link from 'next/link';

import { Button, Typography } from '@ergo-raffle/ui-kit';

export const Hero = () => (
  <div className="h-[calc(100vh-120px)] sm:h-[calc(100vh-164px)] mb-24 sm:mb-6 flex flex-col sm:flex-row items-center gap-x-12 justify-stretch gap-y-8">
    <div className="flex flex-col justify-stretch ">
      <Typography variant="display-md" asChild className="text-black-1 mb-3">
        <h1>Incentivized Crowdfunding</h1>
      </Typography>
      <Typography variant="heading-2">Powered by Ergo, Beyond ERG!</Typography>
      <div className="h-71.75 sm:hidden min-w-1/2 relative grow">
        <Image
          src="/illustrations/hero-section-illustration-mobile.svg"
          alt="Raffle"
          fill
          className="object-right object-scale-down"
        />
      </div>
      <div className="sm:mt-12 w-full sm:w-64">
        <Button variant="primary" className="mt-4 w-full" size="lg" asChild>
          <Link href="/raffles">Explore Raffles</Link>
        </Button>
        <Button variant="outline" className="mt-4 w-full" size="lg" asChild>
          <Link href="/create-raffle">Create Raffle</Link>
        </Button>
      </div>
    </div>
    <div className="hidden sm:block sm:h-87.5 2xl:h-132.5 sm:grow min-w-1/2 relative">
      <Image
        src="/illustrations/hero-section-illustration.svg"
        alt="Raffle"
        fill
        className="object-contain"
      />
    </div>
  </div>
);
