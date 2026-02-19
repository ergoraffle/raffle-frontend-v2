import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const inputVariants = cva(
  'text-black-1 border-gray-4 focus-visible:border-ring aria-invalid:border-error border bg-transparent px-2.5 py-1 typo-body-md transition-colors focus-visible:ring-1 focus-visible:ring-gray-3 file:text-gray1 placeholder:text-gray-1 w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-5 disabled:text-gray-5-foreground transition-all ease-in transition-duration-300',
  {
    variants: {
      size: {
        default: 'h-10.5 sm:h-13 rounded-2xlg sm:rounded-lg px-3 sm:pl-4 sm:pr-3',
        sm: 'h-9.5 sm:h-10 rounded-md px-2 sm:pl-4 sm:pr-3'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

export type InputProps = Omit<ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>;

export const Input = ({ className, size = 'default', ...props }: InputProps) => (
  <input data-slot="input" className={cn(inputVariants({ size, className }))} {...props} />
);
