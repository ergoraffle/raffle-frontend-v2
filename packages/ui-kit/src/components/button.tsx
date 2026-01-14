import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:not-disabled:cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-gray-5 text-gray-5-foreground hover:bg-gray-4 hover:text-gray-4-foreground',
        outline:
          'border-2 border-primary-1 bg-white-1 hover:bg-primary-4 hover:text-primary-4-foreground',
        ghost: 'bg-white-1 text-white-1-foreground hover:bg-gray-5 hover:text-gray-5-foreground',
        contained:
          'bg-primary-1 text-primary-1-foreground hover:bg-primary-2 hover:bg-primary-2-foreground'
      },
      size: {
        default: 'h-12 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-10 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-14 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-12',
        'icon-sm': 'size-10',
        'icon-lg': 'size-14'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
