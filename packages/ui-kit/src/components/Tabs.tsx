import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

export type TabsProps = Omit<ComponentProps<typeof TabsPrimitive.Root>, 'orientation'>;

export const Tabs = ({ className, ...props }: TabsProps) => (
  <TabsPrimitive.Root
    data-slot="tabs"
    className={cn('gap-2 group/tabs flex flex-col', className)}
    {...props}
  />
);

export const tabsListVariants = cva(
  'h-7.5 gap-40 group/tabs-list inline-flex w-full items-center justify-center',
  {
    variants: {
      variant: {
        default: 'mb-8 typo-heading-5 text-black-1',
        primary: 'mb-10 typo-heading-3 text-gray-1 tabs:h-8.5 h-9'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export type TabListProps = Omit<ComponentProps<typeof TabsPrimitive.List>, 'loop'> &
  VariantProps<typeof tabsListVariants>;

export const TabsList = ({ className, variant, ...props }: TabListProps) => (
  <TabsPrimitive.List
    data-slot="tabs-list"
    data-variant={variant}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
);

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger>;

export const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    data-slot="tabs-trigger"
    className={cn(
      "gap-1.5 rounded-sm border-b-3 border-b-transparent px-5 py-0.5 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-black-1 relative inline-flex h-[calc(100%-1px)] items-center justify-center whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      'data-[state=active]:text-black-1',
      'group-data-[variant=default]/tabs-list:data-[state=active]:after:bg-black-1 after:rounded-b-md group-data-[variant=primary]/tabs-list:data-[state=active]:after:bg-primary-1 after:absolute after:h-1.25 after:w-full after:opacity-0 after:transition-opacity after:inset-x-0 after:-bottom-1.25 data-[state=active]:after:opacity-100',
      className
    )}
    {...props}
  />
);

export type TabsContentProps = Omit<ComponentProps<typeof TabsPrimitive.Content>, 'forceMount'>;

export const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Content
    data-slot="tabs-content"
    className={cn('text-sm flex-1 outline-none', className)}
    {...props}
  />
);
