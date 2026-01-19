'use client';

import type { ComponentProps } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';

export const Checkbox = ({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) => (
  <CheckboxPrimitive.Root
    data-slot="checkbox"
    className={cn(
      'peer border-gray-1 data-[state=checked]:bg-primary-1 data-[state=checked]:text-primary-1-foreground dark:data-[state=checked]:bg-primary-1 data-[state=checked]:border-primary-1 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-xs border-2 transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:border-gray-3 disabled:data-[state=checked]:border-gray-3 disabled:data-[state=checked]:bg-gray-3 ',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="grid place-content-center text-current transition-none"
    >
      -
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
