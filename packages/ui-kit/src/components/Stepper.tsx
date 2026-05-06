import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Typography } from './Typography';

export type StepperProps = ComponentProps<'div'> & {
  steps: Array<string>;
  activeStepIndex: number;
  disabled?: boolean;
};

export const Stepper = ({
  steps,
  activeStepIndex,
  className,
  disabled,
  ...props
}: StepperProps) => (
  <div className={cn('flex flex-col items-center justify-center gap-3 w-full ', className)}>
    <div className="flex items-center gap-3 w-full max-w-225 mx-auto" {...props}>
      {steps.map((step, index) => (
        <div
          key={step}
          className={cn(
            'flex-1 rounded-sm h-2',
            index <= activeStepIndex && !disabled ? 'bg-primary-1' : 'bg-black-4'
          )}
        />
      ))}
    </div>
    <Typography variant="heading-3" className={`${disabled ? 'text-gray-3' : ''}`}>
      {steps[activeStepIndex]}
    </Typography>
  </div>
);
