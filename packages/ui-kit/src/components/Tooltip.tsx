'use client';

import type { ComponentProps } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

export type TooltipProvider = ComponentProps<typeof TooltipPrimitive.Provider>;

export const TooltipProvider = ({ delayDuration = 0, ...props }: TooltipProvider) => (
  <TooltipPrimitive.Provider
    data-slot="tooltip-provider"
    delayDuration={delayDuration}
    {...props}
  />
);

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root>;

export const Tooltip = ({ ...props }: TooltipProps) => (
  <TooltipProvider>
    <TooltipPrimitive.Root data-slot="tooltip" {...props} />
  </TooltipProvider>
);

export type TooltipTriggerProps = ComponentProps<typeof TooltipPrimitive.Trigger>;

export const TooltipTrigger = ({ ...props }: TooltipTriggerProps) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

export type TooltipContentProps = ComponentProps<typeof TooltipPrimitive.Content>;

export const TooltipContent = ({
  className,
  sideOffset = 0,
  children,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in shadow-1 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs bg-white-1 text-white-1-foreground z-50 w-fit max-w-xs break-all origin-(--radix-tooltip-content-transform-origin)',
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-white-1 fill-white-1 z-50 translate-y-[calc(-50%_-_2px)]" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);
