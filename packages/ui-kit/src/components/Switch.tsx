import type { ComponentProps } from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root>;

export const Switch = ({ className, ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    className={cn(
      'peer bg-gray-3 data-[state=checked]:bg-primary-1 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-5.5 w-9 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:bg-gray-4 px-1',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        'bg-white-2 pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-4px)] data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitive.Root>
);
