import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { AspectRatio, type AspectRatioProps } from './AspectRatio';
import { Skeleton } from './Skeleton';

export const cardVariants = cva(
  'relative bg-white-2 text-white-2-foreground transition-all ease-in delay-100 gap-2 sm:gap-3 typo-body-sm overflow-hidden rounded-lg text-sm has-data-[slot=card-image-wrapper]:pt-0 has-data-[slot=card-footer]:pb-0 group/card flex flex-col',
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
export type CardImageWrapperProps = AspectRatioProps & { loading?: boolean };

export const CardImageWrapper = ({
  className,
  loading,
  children,
  ...props
}: CardImageWrapperProps) =>
  loading ? (
    <Skeleton className="h-41.75 sm:h-55.75 w-full rounded-none" data-slot="card-image-wrapper" />
  ) : (
    <AspectRatio
      ratio={1.75 / 1}
      data-slot="card-image-wrapper"
      {...props}
      className={cn(
        'bg-gray-5 dark:bg-white-1 w-full relative overflow-hidden before:absolute before:right-0 before:-top-30 before:bg-primary-3 dark:before:opacity-80 before:blur-[100px] before:w-60 before:h-60 after:absolute after:-left-10 after:-bottom-30 after:bg-primary-3 dark:after:opacity-80 after:blur-[90px] after:w-50 after:h-50',
        className
      )}
    >
      {children}
    </AspectRatio>
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
