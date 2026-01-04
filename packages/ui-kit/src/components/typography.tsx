import type * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {}
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
