import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      'heading-1': 'typo-heading-1',
      'heading-2': 'typo-heading-2',
      'heading-3': 'typo-heading-3',
      'heading-4': 'typo-heading-4',
      'heading-5': 'typo-heading-5',
      'display-md': 'typo-display-md',
      'body-sm': 'typo-body-sm',
      'body-md': 'typo-body-md',
      'body-lg': 'typo-body-lg',
      'body-button': 'typo-body-button',
      'body-button-bold': 'typo-body-button-bold',
      'subtitle-sm': 'typo-subtitle-sm',
      'subtitle-md': 'typo-subtitle-md',
      'subtitle-lg': 'typo-subtitle-lg'
    },
    defaultVariants: {
      variant: 'body-md'
    }
  }
});

export type TypographyProps = ComponentProps<'p'> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean;
  };

export const Typography = ({ className, variant, asChild = false, ...props }: TypographyProps) => {
  const Comp = asChild ? Slot : 'p';
  return <Comp className={cn(typographyVariants({ variant, className }))} {...props} />;
};
Typography.displayName = 'Typography';
