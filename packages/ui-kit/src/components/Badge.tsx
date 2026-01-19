import type { HTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-lg border px-2 py-0.5 typo-subtitle-md w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,background-color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-primary-5 text-primary-5-foreground [&:not(:disabled):hover]:bg-primary-4 [&:not(:disabled):hover]:text-primary-4-foreground focus-visible:bg-primary-3 focus-visible:text-primary-3-foreground disabled:border-gray-4 disabled:bg-transparent disabled:text-black-1/40',
        secondary:
          'border-transparent bg-secondary-5 text-secondary-5-foreground [&:not(:disabled):hover]:bg-secondary-3 [&:not(:disabled):hover]:text-secondary-3-foreground focus-visible:bg-secondary-4 focus-visible:text-secondary-4-foreground disabled:border-gray-4 disabled:bg-transparent disabled:text-black-1/40',
        elevated:
          'border-transparent shadow-4 bg-gray-5 text-gray-5-foreground [&:not(:disabled):hover]:bg-gray-4 [&:not(:disabled):hover]:shadow-4 [&:not(:disabled):hover]:text-gray-4-foreground focus-visible:bg-secondary-3 focus-visible:text-secondary-3-foreground focus-visible:shadow-4 disabled:bg-gray-4 disabled:text-gray-4-foreground/40 disabled:shadow-none',
        outline:
          'border-gray-4 text-black-1 [&:not(:disabled):hover]:bg-gray-5 [&:not(:disabled):hover]:border-gray-5 [&:not(:disabled):hover]:text-gray-5-foreground focus-visible:bg-secondary-3 focus-visible:border-transparent focus-visible:text-secondary-3-foreground disabled:border-gray-4 disabled:text-black-1/40',
        success: 'border-transparent bg-success text-success-foreground',
        error: 'border-transparent bg-error text-error-foreground'
      },
      size: {
        sm: 'h-6 px-4',
        md: 'h-[28px]',
        lg: 'h-8'
      }
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md'
    }
  }
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

export const Badge = ({ className, variant, asChild = false, size, ...props }: BadgeProps) => {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
};
