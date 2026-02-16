import type { ComponentProps } from 'react';

export type LayoutBackgroundProps = Omit<ComponentProps<'div'>, 'className'>;

export const LayoutBackground = ({ children, ...props }: LayoutBackgroundProps) => (
  <div
    className="relative before:absolute before:-z-10 before:-left-60 before:-top-60 before:bg-primary-3 before:blur-[100px] sm:before:blur-[280px] before:w-80 sm:before:w-180 before:h-80 sm:before:h-180 after:absolute after:-z-10 after:-left-30 after:bottom-0 after:bg-primary-3 after:blur-[150px] after:w-80 after:h-80"
    {...props}
  >
    <div className="absolute right-0 top-[80vh] before:absolute before:-z-10 before:right-0 before:-top-60 before:bg-primary-3 before:blur-[280px] before:w-90 before:h-90 after:absolute after:-z-10 after:right-0 after:top-16 after:bg-primary-3 after:blur-[150px] after:w-80 after:h-50" />
    {children}
  </div>
);
