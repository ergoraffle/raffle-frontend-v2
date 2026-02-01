import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

export const progressVariants = cva(
  'h-3 rounded-sm relative flex w-full items-center overflow-x-hidden',
  {
    variants: {
      variant: {
        default: 'bg-black-4',
        box: 'border-1 border-black-1 p-1.5 h-10.5 bg-transparent',
        rounded: 'bg-gray-5 rounded-md h-2.5 [&_[data-slot=progress-indicator]]:rounded-md'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants>;

export const Progress = ({ className, value, variant = 'default', ...props }: ProgressProps) => (
  <ProgressPrimitive.Root
    data-slot="progress"
    className={cn(progressVariants({ variant, className }))}
    {...props}
  >
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className="bg-primary-1 h-full transition-all rounded-sm"
      style={{ width: `${value ? 100 - value : 0}%` }}
    />
  </ProgressPrimitive.Root>
);
