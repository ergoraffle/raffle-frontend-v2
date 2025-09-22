import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const typographyVariants = cva('title-1', {
  variants: {
    variant: {
      title: 'title-1',
      subtitle: 'subtitle-1',
      h1: 'heading-1',
      h2: 'heading-2',
      h3: 'heading-3',
      h4: 'heading-4',
      h5: 'heading-5',
      button1: 'button-1',
      button2: 'button-2',
      label: 'label-1',
      input: 'input-1',
      subtext1: 'subtext-1',
      subtext2: 'subtext-2',
      subtext3: 'subtext-3',
      subtext4: 'subtext-4'
    }
  },
  defaultVariants: {
    variant: 'h5'
  }
});

export interface TypographyProps
  extends React.ButtonHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
