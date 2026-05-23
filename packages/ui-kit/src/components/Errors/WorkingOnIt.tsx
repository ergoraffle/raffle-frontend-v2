import type { ComponentProps } from 'react';

import { cn } from '@/lib';
import { useFramework } from '@/providers';

import { Typography } from '../Typography';

export type WorkingOnItProps = ComponentProps<'div'>;

export const WorkingOnIt = ({ className, ...props }: WorkingOnItProps) => {
  const Image = useFramework().components.Image;
  return (
    <div {...props} className={cn('flex flex-col items-center justify-center', className)}>
      <div className="w-1/2 sm:w-1/3 flex justify-center relative before:w-full before:absolute before:bottom-0 before:aspect-square before:rounded-full before:bg-gray-3">
        <div className="w-full flex flex-col items-center justify-center relative">
          <div className="relative aspect-square w-full">
            <Image src="/illustrations/workingOnItIllustration.svg" fill alt="Working On It" />
          </div>
          <Typography variant="subtitle-lg" className="text-center my-5.5">
            Working on it!
          </Typography>
        </div>
      </div>
    </div>
  );
};
