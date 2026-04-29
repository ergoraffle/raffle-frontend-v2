import Image from 'next/image';

import { Card, CardContent, Skeleton, Stepper, Typography } from '@ergo-raffle/ui-kit';

export const CreateRaffleSkeleton = () => (
  <>
    <div className="flex flex-col items-center justify-center space-y-5 py-3.5 mb-7">
      <Image
        src="/illustrations/createRaffleIllustration.svg"
        alt="Create Raffle"
        width={500}
        height={190}
        className="hidden sm:block"
      />
      <Typography variant="heading-1">Ready to create a new raffle?</Typography>
      <Stepper steps={Array.from({ length: 4 })} activeStepIndex={1} disabled />
    </div>
    <Card className="py-7">
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <Skeleton className="w-1/3 h-3" />
          <Skeleton className="w-full sm:w-1/2 h-10" />
        </div>
        <div className="space-y-3">
          <Skeleton className="w-1/3 h-3" />
          <Skeleton className="w-full sm:w-1/2 h-35" />
        </div>
        <div className="space-y-3">
          <Skeleton className="w-1/3 h-3" />
          <Skeleton className="w-full sm:w-2/3 h-10" />
        </div>
        <div className="space-y-3">
          <Skeleton className="w-50 h-3" />
          <Skeleton className="w-1/2 sm:w-70 h-30 sm:h-45" />
        </div>
        <div className="space-y-3">
          <Skeleton className="w-28 h-3" />
          <Skeleton className="w-full sm:w-60 h-10" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="w-full sm:w-60 h-12" />
        </div>
      </CardContent>
    </Card>
  </>
);
