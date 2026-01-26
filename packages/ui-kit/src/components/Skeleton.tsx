import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type SkeletonProps = ComponentProps<'div'>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    data-slot="skeleton"
    className={cn('bg-gray-3 rounded-sm animate-pulse', className)}
    {...props}
  />
);
