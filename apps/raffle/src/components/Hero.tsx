import Image from 'next/image';
import Link from 'next/link';

import { Button, Typography } from '@ergo-raffle/ui-kit';

export const Hero = () => (
  <div className="min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-164px)] mb-24 lg:mb-6 flex flex-col lg:flex-row items-center gap-x-12 justify-stretch gap-y-8 @container">
    <div className="flex flex-col lg:flex-row lg:flex-wrap justify-stretch grow 2xl:flex-col">
      <div className="flex flex-col lg:w-1/2">
        <Typography variant="display-md" asChild className="text-black-1 mb-3 mt-[5vh] lg:mt-0">
          <h1>Incentivized Crowdfunding</h1>
        </Typography>
        <Typography variant="heading-2">Powered by Ergo, Beyond ERG!</Typography>
      </div>
      <div className="flex items-center grow lg:w-1/2 lg:mt-[10vh] xl:mt-0 2xl:hidden">
        <div className="h-[40vh] max-h-87 sm:hidden w-full relative">
          <Image
            src="/illustrations/heroSectionIllustrationMobile.svg"
            alt="Raffle"
            fill
            className="object-contain object-right"
          />
        </div>
        <div className="hidden sm:block h-[40vh] lg:h-87.5 2xl:h-133 grow min-w-1/2 relative md:-mt-[10vh] lg:mt-0">
          <Image
            src="/illustrations/heroSectionIllustration.svg"
            alt="Raffle"
            fill
            className="object-contain object-right"
            sizes="50vw"
          />
        </div>
      </div>
      <div className="xl:mt-12 w-full lg:w-64">
        <Button variant="primary" className="mt-4 w-full" size="lg" asChild>
          <Link href="/raffles">Explore Raffles</Link>
        </Button>
        <Button variant="outline" className="mt-4 w-full" size="lg" asChild>
          <Link href="/raffles/create">Create Raffle</Link>
        </Button>
      </div>
    </div>
    <div className="hidden items-center grow 2xl:flex min-w-1/2">
      <div className="h-132.5 grow relative">
        <Image
          src="/illustrations/heroSectionIllustration.svg"
          alt="Raffle"
          fill
          className="object-contain object-right"
          sizes="50vw"
        />
      </div>
    </div>
  </div>
);
