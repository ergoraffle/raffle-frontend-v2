import type { ComponentProps } from 'react';

import { Loader } from '@ergo-raffle/icons';

import { cn } from '@/lib/utils';

export type SpinnerProps = ComponentProps<'svg'>;

export const Spinner = ({ className, ...props }: SpinnerProps) => (
  <Loader
    role="status"
    aria-label="Loading"
    className={cn('size-4 animate-spin', className)}
    {...props}
  />
);
