import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-6 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:not-disabled:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-primary-6 text-primary-6-foreground hover:bg-primary-4 hover:text-primary-4-foreground typo-body-lg',
        outline:
          'border-2 border-primary-1 text-primary-1 hover:bg-primary-5 hover:text-primary-5-foreground typo-body-button-bold',
        'outline-soft':
          'relative overflow-hidden border-2 border-primary-1 typo-heading-5 px-6 py-3 rounded-lg text-white-1-foreground before:absolute before:inset-0 before:right-0 before:left-auto before:bg-primary-4 before:w-[0] before:transition-width before:duration-300 before:ease-[cubic-bezier(0.7,-0.4,0.4,1.4)] hover:before:w-full hover:[&]:z-8 hover:before:z-10',
        ghost:
          'bg-white-4 text-white-4-foreground hover:bg-black-4 hover:text-black-4-foreground typo-body-lg',
        white:
          'bg-white-2 text-white-2-foreground hover:bg-gray-5 hover:text-gray-5-foreground typo-body-lg',
        primary:
          'bg-primary-1 text-primary-1-foreground hover:bg-primary-2 hover:text-primary-2-foreground typo-body-button-bold',
        'primary-soft':
          'bg-primary-6 text-primary-6-foreground hover:bg-primary-4 hover:text-primary-4-foreground typo-heading-5',
        success:
          'bg-success-light text-success-light-foreground hover:bg-success-light-hover hover:text-success-light-hover-foreground typo-body-lg',
        error:
          'bg-error-light text-error-light-foreground hover:bg-error-light-hover hover:text-error-light-hover-foreground typo-body-lg',
        rounded:
          'bg-white-2 text-white-2-foreground hover:bg-gray-5 hover:text-gray-5-foreground shadow-6 rounded-full'
      },
      size: {
        default: 'h-12 px-3',
        sm: 'h-10 px-3',
        lg: "h-14 px-3 [&_svg:not([class*='size-'])]:size-7",
        icon: 'size-12',
        'icon-sm': 'size-10',
        'icon-lg': "size-14  [&_svg:not([class*='size-'])]:size-7"
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) => {
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
};
