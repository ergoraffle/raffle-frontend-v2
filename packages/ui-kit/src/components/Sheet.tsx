import type { ComponentProps, ReactNode } from 'react';

import { Close } from '@ergo-raffle/icons';
import { Dialog as SheetPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

import { Button } from './Button';

export type SheetProps = ComponentProps<typeof SheetPrimitive.Root>;

export const Sheet = ({ ...props }: SheetProps) => (
  <SheetPrimitive.Root data-slot="sheet" {...props} />
);

export type SheetTriggerProps = ComponentProps<typeof SheetPrimitive.Trigger>;

export const SheetTrigger = ({ ...props }: SheetTriggerProps) => (
  <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
);

export const SheetClose = ({ ...props }: ComponentProps<typeof SheetPrimitive.Close>) => (
  <SheetPrimitive.Close data-slot="sheet-close" {...props} />
);

type SheetPortalProps = ComponentProps<typeof SheetPrimitive.Portal>;

const SheetPortal = ({ ...props }: SheetPortalProps) => (
  <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
);

type SheetOverlayProps = ComponentProps<typeof SheetPrimitive.Overlay>;

const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => (
  <SheetPrimitive.Overlay
    data-slot="sheet-overlay"
    className={cn(
      'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black-3 opacity-45 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:bg-blur fixed inset-0 z-110',
      className
    )}
    {...props}
  />
);

export type SheetContentProps = ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'right' | 'bottom';
  showCloseButton?: boolean;
  title?: ReactNode;
};
export const SheetContent = ({
  className,
  children,
  side = 'bottom',
  showCloseButton = true,
  title,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      data-slot="sheet-content"
      data-side={side}
      className={cn(
        'bg-white-2 data-[side=bottom]:bg-white-1 p-4 data-open:animate-in data-closed:animate-out data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10 data-closed:fade-out-0 data-open:fade-in-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=bottom]:rounded-t-md data-[side=bottom]:data-open:slide-in-from-bottom-10 fixed z-110 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:sm:max-w-sm data-[side=bottom]:max-h-[90vh] group/content bg-blur',
        className
      )}
      {...props}
    >
      {title || showCloseButton ? (
        <SheetHeader>
          {title ? <SheetTitle>{title}</SheetTitle> : null}
          {showCloseButton ? (
            <SheetClose asChild>
              <Button variant="ghost" size="icon-sm">
                <Close className="size-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          ) : null}
        </SheetHeader>
      ) : null}
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
);

type SheetTitleProps = ComponentProps<typeof SheetPrimitive.Title>;

const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    data-slot="sheet-title"
    className="group-data-[side=right]/content:text-right pr-6 group-data-[side=right]/content:pl-6 group-data-[side=right]/content:pr-0 typo-heading-4"
    {...props}
  />
);

type SheetHeaderProps = ComponentProps<'div'>;

const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
  <div
    data-slot="sheet-header"
    className={cn(
      'gap-2 flex items-center flex-row-reverse group-data-[side=right]/content:flex-row has-data-[slot=sheet-title]:justify-between has-data-[slot=sheet-title]:flex-row has-data-[slot=sheet-title]:group-data-[side=right]/content:flex-row-reverse',
      className
    )}
    {...props}
  />
);
export type SheetFooterProps = ComponentProps<'div'>;

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    data-slot="sheet-footer"
    className={cn('gap-2 mt-auto flex flex-col', className)}
    {...props}
  />
);
