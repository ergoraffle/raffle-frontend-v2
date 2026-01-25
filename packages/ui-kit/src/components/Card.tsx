import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type CardProps = ComponentProps<'div'> & { size?: 'default' | 'sm' };

export const Card = ({ className, size = 'default', ...props }: CardProps) => (
  <div
    data-slot="card"
    data-size={size}
    className={cn(
      'ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col',
      className
    )}
    {...props}
  />
);

export type CardHeaderProps = ComponentProps<'div'>;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    data-slot="card-header"
    className={cn(
      'gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
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
      'text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
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
    className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
    {...props}
  />
);

export type CardContentProps = ComponentProps<'div'>;

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div
    data-slot="card-content"
    className={cn('px-4 group-data-[size=sm]/card:px-3', className)}
    {...props}
  />
);

export type CardFooterProps = ComponentProps<'div'>;

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-slot="card-footer"
    className={cn(
      'bg-muted/50 rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3 flex items-center',
      className
    )}
    {...props}
  />
);
