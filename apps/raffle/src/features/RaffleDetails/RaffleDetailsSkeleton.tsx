import Image from 'next/image';

import { Skeleton } from '@ergo-raffle/ui-kit';

import { RaiseProgress } from '@/features/RaiseProgress';

import { RaffleDetailsDescription } from './RaffleDetailsDescription';
import { RaffleDetailsIconBox } from './RaffleDetailsIconBox';
import { RaffleDetailsImageCard } from './RaffleDetailsImageCard';
import { RafflePinButton } from './RafflePinButton';
import { RaffleShareButton } from './RaffleShareButton';

export const RaffleDetailsSkeleton = () => (
  <div className="space-y-9.5">
    <div className="flex flex-col lg:flex-row gap-9.5">
      <RaffleDetailsImageCard loading />
      <div className="flex flex-col gap-5 grow order-1 lg:order-21">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-3.5">
            <RafflePinButton loading />
            <RaffleShareButton loading />
          </div>
        </div>
        <RaiseProgress loading />
        <RaffleDetailsIconBox loading />
        <Skeleton className="h-12 w-full" />
        <div className="relative h-48.5 w-full">
          <Image
            src="/illustrations/raffleDonateIllustration.svg"
            alt="Donate"
            className="object-contain"
            fill
          />
        </div>
      </div>
    </div>
    <RaffleDetailsDescription loading />
  </div>
);
