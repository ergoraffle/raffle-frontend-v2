import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const cardVariants = cva(
  'bg-white-2 border border-gray-5 text-white-2-foreground gap-2 overflow-hidden rounded-lg text-sm has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col',
  {
    variants: {
      padding: {
        true: 'p-4'
      },
      hover: {
        true: 'hover:shadow-1'
      },
      shadow: {
        true: 'shadow-1'
      },

      defaultVariants: {
        variant: 'body-md'
      }
    }
  }
);

export type CardProps = ComponentProps<'div'> & VariantProps<typeof cardVariants>;

export const Card = ({ className, padding, hover, shadow, ...props }: CardProps) => (
  <div
    data-slot="card"
    className={cn(cardVariants({ padding, hover, shadow, className }))}
    {...props}
  />
);

export type CardHeaderProps = ComponentProps<'div'>;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    data-slot="card-header"
    className={cn('gap-1 rounded-t-xl px-4 relative z-0 auto-rows-min items-start', className)}
    {...props}
  />
);

export type CardTitleProps = ComponentProps<'div'>;

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <div data-slot="card-title" className={cn('typo-heading-3 relative', className)} {...props} />
);

export type CardDescriptionProps = ComponentProps<'div'>;

export const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
  <div data-slot="card-description" className={cn('typo-subtitle-lg', className)} {...props} />
);

export type CardActionProps = ComponentProps<'div'>;

export const CardAction = ({ className, ...props }: CardActionProps) => (
  <div
    data-slot="card-action"
    className={cn('absolute right-2.5 top-2.5 z-100', className)}
    {...props}
  />
);

export type CardContentProps = ComponentProps<'div'>;

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div data-slot="card-content" className={cn('px-4 pb-3 relative z-0', className)} {...props} />
);

export type CardFooterProps = ComponentProps<'div'>;

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-slot="card-footer"
    className={cn(
      'border-t border-t-gray-5 py-3 px-4 flex items-center justify-between',
      className
    )}
    {...props}
  />
);
