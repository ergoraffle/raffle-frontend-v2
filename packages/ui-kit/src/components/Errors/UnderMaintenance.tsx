import type { ComponentProps } from 'react';

import { cn } from '@/lib';
import { useFramework } from '@/providers';

import { Typography } from '../Typography';

export type UnderMaintenanceProps = ComponentProps<'div'>;

export const UnderMaintenance = ({ className, ...props }: UnderMaintenanceProps) => {
  const Image = useFramework().components.Image;
  return (
    <div
      {...props}
      className={cn('flex flex-col lg:flex-row items-center justify-center gap-12', className)}
    >
      <div className="flex flex-col items-center justify-center p-4 lg:p-12 aspect-square before:w-full relative before:absolute before:aspect-square before:rounded-full before:bg-gray-3">
        <Image
          src="/illustrations/underMaintenanceIllustration.svg"
          width={599}
          height={599}
          alt="Under Maintenance Error"
          className="relative"
        />
      </div>
      <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start">
        <Typography variant="display-sm">Under maintenance</Typography>
        <Typography variant="heading-3">This section is under development</Typography>
        <Typography variant="body-lg" className="text-center lg:text-left">
          The server failed to process this request. Please retry in a moment.
        </Typography>
      </div>
    </div>
  );
};
