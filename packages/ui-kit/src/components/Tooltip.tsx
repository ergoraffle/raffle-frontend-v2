import type { ReactNode } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
};

export const Tooltip = ({ children, content }: TooltipProps) => (
  <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={0}>
    <TooltipPrimitive.Root data-slot="tooltip">
      <TooltipPrimitive.Trigger data-slot="tooltip-trigger" asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          data-slot="tooltip-content"
          className={cn(
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in shadow-1 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs bg-white-1 text-white-1-foreground z-50 w-fit max-w-xs break-all origin-(--radix-tooltip-content-transform-origin)'
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-white-1 fill-white-1 z-50" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);
