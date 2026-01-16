import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-primary-4 text-primary-4-foreground [a&]:hover:bg-primary-3 [a&]:hover:text-primary-3-foreground [a&]:focus:bg-primary-3 [a&]:focus:text-primary-3-foreground [a&]:disabled:border-gray-4 [a&]:disabled:bg-transparent [a&]:disabled:text-black-1 [a&]:disabled:opacity-5',
        secondary:
          'border-transparent bg-secondary-5 text-secondary-5-foreground [a&]:hover:bg-secondary-3 [a&]:hover:text-secondary-3-foreground [a&]:focus:bg-secondary-4 [a&]:focus:text-secondary-4-foreground [a&]:disabled:border-gray-4 [a&]:disabled:bg-transparent [a&]:disabled:text-black-1 [a&]:disabled:opacity-5',
        elevated:
          'border-transparent drop-shadow-1 bg-gray-5 text-gray-5-foreground [a&]:hover:bg-gray-4 [a&]:hover:text-gray-4-foreground [a&]:focus:bg-secondary-3 [a&]:focus:text-secondary-3-foreground [a&]:disabled:opacity-5 ',
        outline:
          'border-gray-4 text-black-1 [a&]:hover:bg-gray-5 [a&]:hover:text-gray-5-foreground  [a&]:focus:bg-secondary-3 [a&]:focus:text-secondary-3-foreground  [a&]:disabled:opacity-5'
      },
      size: {
        '24': 'h-6',
        '28': 'h-[28px]',
        '32': 'h-8'
      }
    },
    defaultVariants: {
      variant: 'outline',
      size: '28'
    }
  }
);

function Chip({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof chipVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return <Comp data-slot="chip" className={cn(chipVariants({ variant }), className)} {...props} />;
}

export { Chip, chipVariants };
