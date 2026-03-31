'use client';

import Image from 'next/image';

import { Button } from '@ergo-raffle/ui-kit';

export const RaffleDonate = () => (
  <div className="grow w-full relative">
    <Button variant="primary" className="w-full">
      Donate
    </Button>
    <div
      className={`hidden sm:block absolute bottom-0 left-0 z-9 h-48.5 w-full transition-all transition-duration-300`}
    >
      <Image
        src="/illustrations/raffleDonateIllustration.svg"
        alt="Donate"
        className={`object-contain object-bottom`}
        fill
      />
    </div>
  </div>
);
