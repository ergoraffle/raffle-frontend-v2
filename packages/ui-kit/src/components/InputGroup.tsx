import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Input, type InputProps } from './Input';

export const inputGroupVariants = cva(
  'has-disabled:bg-gray-5 rounded-lg transition-colors has-disabled:bg-gray-5 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 group/input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto',
  {
    variants: {
      variant: {
        default:
          'bg-white-3 text-white-3-foreground has-[[data-slot=input-group-control]:focus-visible]:bg-white-2 [&_[data-slot=input-group-control]]:pl-0 aria-invalid:bg-error-light-hover focus-visible:bg-white-2 has-[[data-slot][aria-invalid=true]]:bg-error-light-hover in-data-[slot=combobox-content]:focus-within:bg-inherit',
        bordered:
          'border border-gray-4 focus-within:border-ring aria-invalid:border-error focus-visible:ring-1 [&_[data-slot=input-group-control]]:pl-0 has-[[data-slot][aria-invalid=true]]:border-error in-data-[slot=combobox-content]:focus-within:border-inherit focus-visible:ring-gray-3 data-[state=open]:border-inherit data-[state=open]:ring-0'
      },
      size: {
        sm: 'h-9.5 sm:h-10 rounded-md pl-2 pr-1.5 sm:pl-4 sm:pr-3',
        default: 'h-10.5 sm:h-13 rounded-2xlg sm:rounded-lg px-3 sm:pl-4 sm:pr-3'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type InputGroupProps = ComponentProps<'div'> & VariantProps<typeof inputGroupVariants>;

export const InputGroup = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: InputGroupProps) => (
  <div
    data-slot="input-group"
    className={cn(inputGroupVariants({ variant, size, className }))}
    {...props}
  />
);

export const inputGroupAddonVariants = cva(
  "text-muted-foreground h-auto gap-2 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none",
  {
    variants: {
      align: {
        'inline-start': 'has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem] order-first',
        'inline-end': 'has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem] order-last'
      }
    },
    defaultVariants: {
      align: 'inline-start'
    }
  }
);

export type InputGroupAddonProps = ComponentProps<'div'> &
  VariantProps<typeof inputGroupAddonVariants>;

export const InputGroupAddon = ({
  className,
  align = 'inline-start',
  ...props
}: InputGroupAddonProps) => (
  <div
    data-slot="input-group-addon"
    data-align={align}
    className={cn(inputGroupAddonVariants({ align, className }))}
    {...props}
  />
);

export const InputGroupInput = ({ className, ...props }: InputProps) => (
  <Input
    data-slot="input-group-control"
    className={cn(
      'rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 flex-1',
      className
    )}
    {...props}
  />
);
