import type * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      'heading-1': 'font-poppins font-semibold text-5xl',
      'heading-2': 'font-poppins font-medium text-3xl',
      'heading-3': 'font-poppins font-medium text-2xl',
      'heading-4': 'font-karla font-medium text-xl',
      'heading-5': 'font-poppins font-normal text-lg',
      'display-md': 'font-fraunces font-normal text-7xl',
      'body-sm': 'font-poppins font-light text-md',
      'body-md': 'font-poppins font-medium text-md',
      'body-lg': 'font-karla text-2xl',
      'body-button': 'font-poppins font-medium text-lg',
      'body-button-bold': 'font-poppins font-semibold text-2xl',
      'subtitle-sm': 'font-karla font-normal text-xs',
      'subtitle-md': 'font-karla font-normal text-sm',
      'subtitle-lg': 'font-karla font-medium text-md'
    },
    defaultVariants: {
      variant: 'body-md'
    }
  }
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = ({ className, variant, asChild = false, ...props }: TypographyProps) => {
  const Comp = asChild ? Slot : 'p';
  return <Comp className={cn(typographyVariants({ variant, className }))} {...props} />;
};
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
