import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Skeleton } from './Skeleton';

export const cardVariants = cva(
  'relative bg-white-2 text-white-2-foreground transition-all ease-in delay-100 gap-3 typo-body-sm overflow-hidden rounded-lg text-sm has-[>img:first-child]:pt-0 has-data-[slot=image-skeleton]:pt-0 has-data-[slot=card-footer]:pb-0 group/card flex flex-col',
  {
    variants: {
      padding: {
        xs: 'py-2 rounded-md',
        sm: 'py-2',
        md: 'py-2.5',
        lg: 'py-4'
      },
      hover: {
        true: 'hover:shadow-1'
      },
      border: {
        true: 'border border-gray-5'
      },
      shadow: {
        true: 'shadow-1'
      },
      defaultVariants: {
        padding: 'lg',
        border: true
      }
    }
  }
);

export type CardProps = ComponentProps<'div'> & VariantProps<typeof cardVariants>;

export const Card = ({
  className,
  padding = 'lg',
  hover,
  shadow,
  border = true,
  ...props
}: CardProps) => (
  <div
    data-slot="card"
    data-padding={padding}
    className={cn(cardVariants({ padding, hover, shadow, border, className }))}
    {...props}
  />
);

export type CardHeaderProps = ComponentProps<'div'>;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    data-slot="card-header"
    className={cn('rounded-t-xl px-4 z-0 group-data-[padding=xs]/card:px-3', className)}
    {...props}
  />
);

export type CardTitleProps = ComponentProps<'div'> & { loading?: boolean };

export const CardTitle = ({ className, loading, ...props }: CardTitleProps) =>
  loading ? (
    <Skeleton className="h-6 w-full not-last:mb-2" />
  ) : (
    <div data-slot="card-title" className={cn('typo-heading-3', className)} {...props} />
  );

export type CardDescriptionProps = ComponentProps<'div'> & { loading?: boolean };

export const CardDescription = ({ className, loading, ...props }: CardDescriptionProps) =>
  loading ? (
    <Skeleton className="h-3.5 w-1/2" />
  ) : (
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
  <div
    data-slot="card-content"
    className={cn('px-4 z-0 group-data-[padding=xs]/card:px-3', className)}
    {...props}
  />
);

export type CardFooterProps = ComponentProps<'div'>;

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-slot="card-footer"
    className={cn(
      'border-t border-t-gray-5 py-3 px-4 flex items-center justify-between group-data-[padding=xs]/card:px-3',
      className
    )}
    {...props}
  />
);
