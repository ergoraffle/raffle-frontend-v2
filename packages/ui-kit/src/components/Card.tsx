import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const cardVariants = cva(
  'bg-white-2 border border-gray-5 text-gray-5-foreground gap-4 overflow-hidden rounded-lg py-4 text-sm has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col',
  {
    variants: {
      variant: {
        paper: 'shadow-1'
      },
      size: {
        default: '',
        sm: ''
      },

      defaultVariants: {
        variant: 'body-md'
      }
    }
  }
);

export type CardProps = ComponentProps<'div'> & VariantProps<typeof cardVariants>;

export const Card = ({ className, variant, size = 'default', ...props }: CardProps) => (
  <div
    data-slot="card"
    data-size={size}
    className={cn(cardVariants({ variant, className }))}
    {...props}
  />
);

export type CardHeaderProps = ComponentProps<'div'>;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    data-slot="card-header"
    className={cn(
      'gap-1 rounded-t-xl px-4 relative z-0 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
      className
    )}
    {...props}
  />
);

export type CardTitleProps = ComponentProps<'div'>;

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <div
    data-slot="card-title"
    className={cn(
      'text-base leading-snug font-medium group-data-[size=sm]/card:text-sm relative',
      className
    )}
    {...props}
  />
);

export type CardDescriptionProps = ComponentProps<'div'>;

export const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
  <div
    data-slot="card-description"
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);

export type CardActionProps = ComponentProps<'div'>;

export const CardAction = ({ className, ...props }: CardActionProps) => (
  <div
    data-slot="card-action"
    className={cn('absolute right-2.5 top-2.5 z-10', className)}
    {...props}
  />
);

export type CardContentProps = ComponentProps<'div'>;

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div data-slot="card-content" className={cn('p-3 relative z-0', className)} {...props} />
);

export type CardFooterProps = ComponentProps<'div'>;

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-slot="card-footer"
    className={cn(
      'border-t border-t-gray-5 py-3 px-4 group-data-[size=sm]/card:p-3 flex items-center',
      className
    )}
    {...props}
  />
);
