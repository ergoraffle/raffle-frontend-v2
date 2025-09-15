import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const buttonVariants = cva('btn', {
  variants: {
    color: {
      primary: 'btn-primary',
      secondary: 'btn-secondary'
    },
    variant: {
      default: '',
      outline: 'btn-outline'
    },
    size: {
      sm: 'h-9 rounded-md px-3',
      lg: 'h-14 rounded-md px-8',
      icon: 'h-14 w-14'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'icon'
  }
});

export type ButtonProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, variant, size, asChild = false, children }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ color, variant, size }))} ref={ref}>
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
